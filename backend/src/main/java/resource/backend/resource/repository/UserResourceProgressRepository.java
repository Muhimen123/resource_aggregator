package resource.backend.resource.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.resource.entity.UserResourceProgress;

@Repository
public interface UserResourceProgressRepository extends JpaRepository<UserResourceProgress, resource.backend.resource.entity.UserResourceProgressId> {
}
