package resource.backend.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.user.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, java.util.UUID> {
}
