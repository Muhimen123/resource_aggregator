package resource.backend.avatar.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import resource.backend.common.entity.BaseEntity;

@Entity
@Table(name = "avatar_eyes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AvatarEye extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String name;

    @Column(name = "graphics_url", nullable = false)
    private String graphicsUrl;

    @Column(columnDefinition = "jsonb")
    private String position;
}
