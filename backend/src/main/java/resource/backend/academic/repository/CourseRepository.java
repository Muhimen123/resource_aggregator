package resource.backend.academic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.academic.entity.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, java.util.UUID> {
}
