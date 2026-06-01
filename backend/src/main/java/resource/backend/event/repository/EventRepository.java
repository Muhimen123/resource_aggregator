package resource.backend.event.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.event.entity.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, java.util.UUID> {
}
