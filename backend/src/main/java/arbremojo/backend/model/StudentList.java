package arbremojo.backend.model;

import arbremojo.backend.model.user.Student;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "student_list")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class StudentList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_list_id")
    private Integer studentListId;

    @Column(name = "absent")
    @ColumnDefault("false")
    private boolean absent;

    @Column(name = "minutes_late")
    @ColumnDefault("0")
    private int minutesLate;

    @Column(name = "time_table_id", nullable = false)
    private Integer timeTableId;

    @Column(name = "student_id", nullable = false)
    private Integer studentId;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Student.class)
    @JoinColumn(name = "student_id", insertable = false, updatable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = TimeTable.class)
    @JoinColumn(name = "time_table_id", insertable = false, updatable = false)
    private TimeTable timeTable;
}
