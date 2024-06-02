package arbremojo.backend.model.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "professor")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Professor extends User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "professor_id", nullable = false)
    private Integer professor_id;
    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "token")
    private String token;
    @Column(name = "pfp_img_path")
    private String pfpImgPath;

    @Override
    public int getUserId() {
        return professor_id;
    }
}
