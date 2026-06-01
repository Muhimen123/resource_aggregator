package resource.backend.academic.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import resource.backend.common.entity.BaseEntity;
import resource.backend.user.entity.User;

@Entity
@Table(name = "semesters", uniqueConstraints = {@UniqueConstraint(columnNames = {"owner_id", "name"})})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Semester extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;
}
