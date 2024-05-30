package arbremojo.backend.model;

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
    @Column(name = "course_list_id")
    private Integer courseListId;
    @Column(name = "professor_id")
    private Integer professorId;
    @Column(name = "course_id")
    private Integer courseId;
}
