package resource.backend.syllabus.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import resource.backend.common.entity.BaseEntity;

@Entity
@Table(name = "syllabus_items", uniqueConstraints = {@UniqueConstraint(columnNames = {"syllabus_id", "sequence_no"})})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SyllabusItem extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "syllabus_id", nullable = false)
    private Syllabus syllabus;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(name = "sequence_no", nullable = false)
    private Integer sequenceNo = 0;
}
