package resource.backend.resource.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.resource.entity.ResourceAiMetadata;

@Repository
public interface ResourceAiMetadataRepository extends JpaRepository<ResourceAiMetadata, java.util.UUID> {
}
