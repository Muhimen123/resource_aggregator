package resource.backend.suggestion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.suggestion.entity.SuggestionResource;

@Repository
public interface SuggestionResourceRepository extends JpaRepository<SuggestionResource, resource.backend.suggestion.entity.SuggestionResourceId> {
}
