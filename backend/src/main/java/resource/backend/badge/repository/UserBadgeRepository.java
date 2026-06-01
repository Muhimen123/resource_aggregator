package resource.backend.badge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.badge.entity.UserBadge;

@Repository
public interface UserBadgeRepository extends JpaRepository<UserBadge, resource.backend.badge.entity.UserBadgeId> {
}
