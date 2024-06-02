package arbremojo.backend.repository;

import arbremojo.backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {
    @Modifying
    @Query("DELETE FROM Message p WHERE p.messageId = :id")
    Integer deleteEntityById(Integer id);

    @Query("SELECT m FROM Message m WHERE m.conversationId = :conversationId")
    List<Message> getMessagesByConversationId(Integer conversationId);
}
