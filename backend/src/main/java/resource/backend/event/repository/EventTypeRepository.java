package resource.backend.event.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.event.entity.EventType;

@Repository
public interface EventTypeRepository extends JpaRepository<EventType, java.util.UUID> {
}
