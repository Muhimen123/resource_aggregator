package resource.backend.reward.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import resource.backend.reward.entity.RewardEvent;

@Repository
public interface RewardEventRepository extends JpaRepository<RewardEvent, java.util.UUID> {
}
