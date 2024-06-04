package arbremojo.backend.model;

import arbremojo.backend.model.user.Admin;
import arbremojo.backend.model.user.Professor;
import arbremojo.backend.model.user.Student;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.security.Timestamp;
import java.util.Date;

@Entity
@Table(name = "message")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id", nullable = false)
    private Integer messageId;
    @Column(name = "message", nullable = false)
    private String message;
    @Column(name = "timestamp", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @ColumnDefault("CURRENT_TIMESTAMP")
    private Date timestamp;

    @Column(name = "professor_id", nullable = false)
    private Integer professorId;

    @Column(name = "student_id", nullable = false)
    private Integer studentId;

    @Column(name = "admin_id", nullable = false)
    private Integer adminId;

    @Column(name = "conversation_id", nullable = false)
    private Integer conversationId;

    @Transient
    private Professor professor;

    @Transient
    private Student student;

    @Transient
    private Admin admin;
}
