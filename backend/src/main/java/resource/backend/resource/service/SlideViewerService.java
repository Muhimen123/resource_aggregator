package resource.backend.resource.service;

import com.groupdocs.viewer.Viewer;
import com.groupdocs.viewer.options.PngViewOptions;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;
import resource.backend.resource.entity.Resource;
import resource.backend.resource.entity.ResourceType;
import resource.backend.resource.repository.ResourceRepository;
import resource.backend.gdrive.service.GoogleDriveService;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.UUID;

/**
 * Service to handle high-fidelity slide page rendering using GroupDocs.Viewer
 * and file retrieval from storage.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SlideViewerService {

    private final ResourceRepository resourceRepository;
    private final RestClient restClient = RestClient.create();
    private final GoogleDriveService googleDriveService;

    /**
     * Renders a specific slide page to raw PNG bytes.
     *
     * @param resourceId The UUID of the slide resource
     * @param pageNumber The 1-based page number to render
     * @return Raw PNG image bytes
     */
    public byte[] renderSlidePage(UUID resourceId, int pageNumber) {
        log.info("Rendering slide page {} for resource {}", pageNumber, resourceId);

        // 1. Fetch resource from the database
        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Slide resource not found with ID: " + resourceId));

        // 2. Download the original slide document (PDF/PPTX) from Google Drive
        byte[] fileBytes = downloadFile(resource);

        // 3. Render the specific page to PNG using GroupDocs.Viewer
        return convertPageToPng(fileBytes, pageNumber);
    }

    /**
     * Retrieves metadata about the document (e.g., total number of pages).
     */
    public DocumentMetadata getDocumentMetadata(UUID resourceId) {
        log.info("Fetching document metadata for resource {}", resourceId);
        
        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Slide resource not found with ID: " + resourceId));

        ResourceType type = resource.getResourceType();
        String driveUrl = resource.getDriveUrl();

        if (type == ResourceType.video || type == ResourceType.audio) {
            return new DocumentMetadata(1, type.name(), driveUrl);
        }

        byte[] fileBytes = downloadFile(resource);

        try (InputStream inputStream = new ByteArrayInputStream(fileBytes)) {
            try (Viewer viewer = new Viewer(inputStream)) {
                com.groupdocs.viewer.options.ViewInfoOptions viewInfoOptions = com.groupdocs.viewer.options.ViewInfoOptions.forPngView(false);
                com.groupdocs.viewer.results.ViewInfo viewInfo = viewer.getViewInfo(viewInfoOptions);
                int totalPages = viewInfo.getPages().size();
                return new DocumentMetadata(totalPages, type.name(), null);
            }
        } catch (Exception e) {
            log.error("Failed to get document metadata", e);
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error getting document info: " + e.getMessage(), e);
        }
    }

    public record DocumentMetadata(int totalPages, String resourceType, String mediaUrl) {}

    /**
     * Downloads the resource's original document from the owner's Google Drive
     * using their stored OAuth access/refresh tokens.
     *
     * Requires:
     *   - resource.getOwner().getId() matches a row in user_google_tokens
     *   - resource.getDriveFileId() is a valid Google Drive file ID
     */
    private byte[] downloadFile(Resource resource) {
        try {
            String userId = resource.getOwner().getId().toString();
            String fileId = resource.getDriveFileId();

            log.info("Downloading file {} from Google Drive for user {}", fileId, userId);

            com.google.api.services.drive.Drive drive = googleDriveService.getDriveService(userId);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            drive.files().get(fileId).executeMediaAndDownloadTo(outputStream);

            byte[] bytes = outputStream.toByteArray();
            if (bytes.length == 0) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Downloaded file from Google Drive is empty");
            }
            return bytes;
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            log.error("Failed to download file from Google Drive for resource {}", resource.getId(), e);
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Failed to download the document from Google Drive: " + e.getMessage());
        }
    }

    /**
     * Converts a specific page of document bytes into PNG image bytes using GroupDocs.Viewer.
     */
    private byte[] convertPageToPng(byte[] fileBytes, int pageNumber) {
        try (InputStream inputStream = new ByteArrayInputStream(fileBytes);
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

            // Load document stream into GroupDocs.Viewer
            try (Viewer viewer = new Viewer(inputStream)) {
                // Configure PNG options to capture the page output into our byte stream
                PngViewOptions viewOptions = new PngViewOptions(page -> outputStream);

                // Render the specific slide page
                viewer.view(viewOptions, pageNumber);
            }

            byte[] pngBytes = outputStream.toByteArray();
            if (pngBytes.length == 0) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Rendered page bytes are empty");
            }

            return pngBytes;
        } catch (Exception e) {
            log.error("GroupDocs.Viewer failed to render page {}", pageNumber, e);
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error rendering slide page: " + e.getMessage(), e);
        }
    }
}
