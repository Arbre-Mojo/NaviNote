package arbremojo.backend.controller;

import arbremojo.backend.model.Conversation;
import arbremojo.backend.service.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/conversation")
public class ConversationController extends EntityController<Conversation, ConversationService> {

    @Autowired
    protected ConversationController(ConversationService entityService) {
        super(entityService, Conversation.class);
    }

    @GetMapping("/get-conversations-by-professor-id/{professorId}")
    public ResponseEntity<List<Conversation>> getConversationsByProfessorId(@PathVariable("professorId") Integer professorId) {
        return ResponseEntity.ok(entityService.getConversationsByProfessorId(professorId));
    }

    @GetMapping("/get-conversations-by-student-id/{studentId}")
    public ResponseEntity<List<Conversation>> getConversationsByStudentId(@PathVariable("studentId") Integer studentId) {
        return ResponseEntity.ok(entityService.getConversationsByStudentId(studentId));
    }
}
