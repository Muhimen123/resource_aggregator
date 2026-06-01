package resource.backend.badge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.badge.entity.Badge;

@Repository
public interface BadgeRepository extends JpaRepository<Badge, java.util.UUID> {
}
