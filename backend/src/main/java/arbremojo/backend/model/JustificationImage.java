package arbremojo.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "justification_image")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class JustificationImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "justification_image_id")
    private Integer justificationImageId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "justification_id", nullable = false)
    private Integer justificationId;
}
