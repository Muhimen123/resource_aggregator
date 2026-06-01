package resource.backend.avatar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.avatar.entity.Avatar;

@Repository
public interface AvatarRepository extends JpaRepository<Avatar, java.util.UUID> {
}
