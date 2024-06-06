package arbremojo.backend.model;

import arbremojo.backend.model.user.Student;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;

@Entity
@Table(name = "justification")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Justification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "justification_id")
    private Integer justificationId;

    @Column(name = "reason", nullable = false)
    private String reason;

    @Column(name = "accepted")
    private Boolean accepted;

    @Column(name = "student_list_id", nullable = false)
    private Integer studentListId;

    @Column(name = "student_id", nullable = false)
    private Integer studentId;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Student.class)
    @JoinColumn(name = "student_id", insertable = false, updatable = false)
    private Student student;

    @OneToOne(fetch = FetchType.EAGER, targetEntity = StudentList.class)
    @JoinColumn(name = "student_list_id", insertable = false, updatable = false)
    private StudentList studentList;

    @OneToMany(fetch = FetchType.EAGER, targetEntity = JustificationImage.class)
    @JoinColumn(name = "justification_id", insertable = false, updatable = false)
    private List<JustificationImage> justificationImageList;
}
