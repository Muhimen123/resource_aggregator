package resource.backend.resource.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.resource.entity.ResourceView;

@Repository
public interface ResourceViewRepository extends JpaRepository<ResourceView, resource.backend.resource.entity.ResourceViewId> {
}
