package arbremojo.backend.service;

import arbremojo.backend.model.Message;
import arbremojo.backend.repository.MessageRepository;
import arbremojo.backend.service.user.AdminService;
import arbremojo.backend.service.user.ProfessorService;
import arbremojo.backend.service.user.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MessageService extends EntityService<Message, MessageRepository> {
    private final StudentService studentService;
    private final AdminService adminService;
    private final ProfessorService professorService;

    @Autowired
    public MessageService(MessageRepository entityRepository, StudentService studentService, AdminService adminService, ProfessorService professorService) {
        super(entityRepository);
        this.studentService = studentService;
        this.adminService = adminService;
        this.professorService = professorService;
    }

    @Transactional
    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }

    public List<Message> getMessagesByConversationId(Integer conversationId) {
        List<Message> messages = entityRepository.getMessagesByConversationId(conversationId);
        for (Message message : messages) {
            if (message.getStudentId() > 0) {
                message.setStudent(studentService.findEntityById(message.getStudentId()));
            } else if (message.getProfessorId() > 0) {
                message.setProfessor(professorService.findEntityById(message.getProfessorId()));
            } else if (message.getAdminId() > 0) {
                message.setAdmin(adminService.findEntityById(message.getAdminId()));
            }
        }
        return messages;
    }
}
