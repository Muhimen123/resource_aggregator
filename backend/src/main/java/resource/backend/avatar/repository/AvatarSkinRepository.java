package resource.backend.avatar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.avatar.entity.AvatarSkin;

@Repository
public interface AvatarSkinRepository extends JpaRepository<AvatarSkin, java.util.UUID> {
}
