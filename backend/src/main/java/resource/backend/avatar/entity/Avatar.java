package resource.backend.avatar.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import resource.backend.common.entity.BaseEntity;

@Entity
@Table(name = "avatars")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Avatar extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skin_id")
    private AvatarSkin skin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nose_id")
    private AvatarNose nose;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "eye_id")
    private AvatarEye eye;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mouth_id")
    private AvatarMouth mouth;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accessory_id")
    private AvatarAccessory accessory;
}
