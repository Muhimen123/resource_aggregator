package resource.backend.academic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.academic.entity.Semester;

@Repository
public interface SemesterRepository extends JpaRepository<Semester, java.util.UUID> {
}
