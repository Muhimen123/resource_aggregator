package resource.backend.resource.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.resource.entity.ResourceTag;

@Repository
public interface ResourceTagRepository extends JpaRepository<ResourceTag, resource.backend.resource.entity.ResourceTagId> {
}
