package resource.backend.syllabus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.syllabus.entity.Syllabus;

@Repository
public interface SyllabusRepository extends JpaRepository<Syllabus, java.util.UUID> {
}
