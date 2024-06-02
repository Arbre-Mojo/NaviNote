package arbremojo.backend.model;

import arbremojo.backend.model.user.Professor;
import arbremojo.backend.model.user.Student;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "conversation")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "conversation_id", nullable = false)
    private Integer conversationId;

    @Column(name = "professor_id", nullable = false)
    private Integer professorId;

    @Column(name = "student_id", nullable = false)
    private Integer studentId;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Professor.class)
    @JoinColumn(name = "professor_id", insertable = false, updatable = false)
    private Professor professor;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Student.class)
    @JoinColumn(name = "student_id", insertable = false, updatable = false)
    private Student student;
}
