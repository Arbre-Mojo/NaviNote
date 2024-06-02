package arbremojo.backend.service;

import arbremojo.backend.model.Conversation;
import arbremojo.backend.repository.ConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConversationService extends EntityService<Conversation, ConversationRepository> {

    @Autowired
    public ConversationService(ConversationRepository entityRepository) {
        super(entityRepository);
    }

    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }

    public List<Conversation> getConversationsByProfessorId(Integer professorId) {
        return entityRepository.getConversationsByProfessorId(professorId);
    }

    public List<Conversation> getConversationsByStudentId(Integer studentId) {
        return entityRepository.getConversationsByStudentId(studentId);
    }
}
