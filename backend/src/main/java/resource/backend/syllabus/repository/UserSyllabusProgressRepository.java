package resource.backend.syllabus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.syllabus.entity.UserSyllabusProgress;

@Repository
public interface UserSyllabusProgressRepository extends JpaRepository<UserSyllabusProgress, resource.backend.syllabus.entity.UserSyllabusProgressId> {
}
