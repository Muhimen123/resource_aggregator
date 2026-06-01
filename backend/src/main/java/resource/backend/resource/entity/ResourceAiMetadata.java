package resource.backend.resource.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import resource.backend.common.entity.BaseEntity;

import java.time.OffsetDateTime;

@Entity
@Table(name = "resource_ai_metadata")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResourceAiMetadata extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resource_id", nullable = false, unique = true)
    private Resource resource;

    private String summary;

    @Column(name = "practice_questions", columnDefinition = "jsonb")
    private String practiceQuestions;

    @Column(name = "generated_at")
    private OffsetDateTime generatedAt;
}
