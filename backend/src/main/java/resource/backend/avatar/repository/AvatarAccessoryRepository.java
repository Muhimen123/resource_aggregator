package resource.backend.avatar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.avatar.entity.AvatarAccessory;

@Repository
public interface AvatarAccessoryRepository extends JpaRepository<AvatarAccessory, java.util.UUID> {
}
