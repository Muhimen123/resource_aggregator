package resource.backend.avatar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.avatar.entity.AvatarNose;

@Repository
public interface AvatarNoseRepository extends JpaRepository<AvatarNose, java.util.UUID> {
}
