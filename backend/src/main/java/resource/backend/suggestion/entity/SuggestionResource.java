package resource.backend.suggestion.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import resource.backend.resource.entity.Resource;

import java.time.OffsetDateTime;

@Entity
@Table(name = "suggestion_resources")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class SuggestionResource {

    @EmbeddedId
    private SuggestionResourceId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("suggestionId")
    @JoinColumn(name = "suggestion_id")
    private Suggestion suggestion;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("resourceId")
    @JoinColumn(name = "resource_id")
    private Resource resource;

    private String annotation;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;
}
