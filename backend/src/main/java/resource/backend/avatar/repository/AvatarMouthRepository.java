package resource.backend.avatar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.avatar.entity.AvatarMouth;

@Repository
public interface AvatarMouthRepository extends JpaRepository<AvatarMouth, java.util.UUID> {
}
