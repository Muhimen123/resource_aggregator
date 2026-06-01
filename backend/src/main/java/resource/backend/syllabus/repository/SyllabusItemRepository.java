package resource.backend.syllabus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.syllabus.entity.SyllabusItem;

@Repository
public interface SyllabusItemRepository extends JpaRepository<SyllabusItem, java.util.UUID> {
}
