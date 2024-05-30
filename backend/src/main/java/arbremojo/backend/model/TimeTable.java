package arbremojo.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "time_table")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class TimeTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "time_table_id")
    private int timeTableId;
    @Column(name = "student_id")
    private int studentId;
    @Column(name = "course_id")
    private int courseId;
    @Column(name = "time_start")
    private String timeStart;
    @Column(name = "time_end")
    private String timeEnd;
    @Column(name = "room")
    private String room;
    @Column(name = "campus")
    private String campus;
    @Column(name = "is_absent")
    private boolean is_absent;
    @Column(name = "minutes_late")
    private int minutesLate;
}
