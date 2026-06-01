package resource.backend.resource.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.resource.entity.Resource;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, java.util.UUID> {
}
