package arbremojo.backend.model;

import arbremojo.backend.model.user.Student;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.Date;

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
    private Integer timeTableId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "time_start", nullable = false)
    private Date timeStart;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "time_end", nullable = false)
    private Date timeEnd;

    @Column(name = "room")
    private String room;

    @Column(name = "campus")
    private String campus;

    @Column(name = "course_id", nullable = false)
    private Integer courseId;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Course.class)
    @JoinColumn(name = "course_id", insertable = false, updatable = false)
    private Course course;
}
