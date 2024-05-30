package arbremojo.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "course")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Integer courseId;
    @Column(name = "course_name")
    private String courseName;
}
