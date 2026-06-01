package resource.backend.suggestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.suggestion.entity.Suggestion;

@Repository
public interface SuggestionRepository extends JpaRepository<Suggestion, java.util.UUID> {
}
