package arbremojo.backend.model;

import arbremojo.backend.model.user.Professor;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "course_list")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CourseList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_list_id", nullable = false)
    private Integer courseListId;

    @JoinColumn(name = "professor_id", nullable = false)
    private Integer professorId;
    @JoinColumn(name = "course_id", nullable = false)
    private Integer courseId;
}
