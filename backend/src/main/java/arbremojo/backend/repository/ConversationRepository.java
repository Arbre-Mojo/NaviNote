package arbremojo.backend.repository;

import arbremojo.backend.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ConversationRepository extends JpaRepository<Conversation, Integer> {
    @Modifying
    @Query("DELETE FROM Conversation p WHERE p.conversationId = :id")
    Integer deleteEntityById(Integer id);

    @Query("SELECT p FROM Conversation p WHERE p.professorId = :professorId")
    List<Conversation> getConversationsByProfessorId(Integer professorId);

    @Query("SELECT p FROM Conversation p WHERE p.studentId = :studentId")
    List<Conversation> getConversationsByStudentId(Integer studentId);
}
