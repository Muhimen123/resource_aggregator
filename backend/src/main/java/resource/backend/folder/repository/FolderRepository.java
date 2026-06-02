package resource.backend.folder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.folder.entity.Folder;

@Repository
public interface FolderRepository extends JpaRepository<Folder, java.util.UUID> {
    java.util.Optional<Folder> findByOwnerIdAndNameAndParentIsNull(java.util.UUID ownerId, String name);
    java.util.Optional<Folder> findByDriveFolderId(String driveFolderId);
}
