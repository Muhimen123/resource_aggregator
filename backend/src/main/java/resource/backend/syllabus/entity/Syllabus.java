package resource.backend.syllabus.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import resource.backend.common.entity.BaseEntity;
import resource.backend.event.entity.Event;

@Entity
@Table(name = "syllabi")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Syllabus extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false, unique = true)
    private Event event;
}
