package arbremojo.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "Course_List")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CourseList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_list_id")
    private int courseListId;
    @Column(name = "professor_id")
    private int professorId;
    @Column(name = "course_id")
    private int courseId;
}
