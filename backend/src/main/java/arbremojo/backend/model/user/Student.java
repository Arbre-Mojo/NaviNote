package arbremojo.backend.model.user;

import arbremojo.backend.model.Promo;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Student extends User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id", nullable = false)
    private Integer studentId;
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

    @Column(name = "promo_id", nullable = false)
    private Integer promoId;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Promo.class)
    @JoinColumn(name = "promo_id", insertable = false, updatable = false)
    private Promo promo;

    @Override
    public int getUserId() {
        return studentId;
    }
}
