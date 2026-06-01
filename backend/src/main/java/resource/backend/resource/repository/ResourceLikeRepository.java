package resource.backend.resource.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.resource.entity.ResourceLike;

@Repository
public interface ResourceLikeRepository extends JpaRepository<ResourceLike, resource.backend.resource.entity.ResourceLikeId> {
}
