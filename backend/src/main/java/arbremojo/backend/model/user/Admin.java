package arbremojo.backend.model.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "admin")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Admin extends User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Integer adminId;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "token")
    private String token;
    @Column(name = "pfp_img_path")
    private String pfpImgPath;

    @Override
    public int getUserId() {
        return adminId;
    }
}
