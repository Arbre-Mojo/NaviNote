package arbremojo.backend.controller;

import arbremojo.backend.model.Message;
import arbremojo.backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/message")
public class MessageController extends EntityController<Message, MessageService> {

    @Autowired
    protected MessageController(MessageService entityService) {
        super(entityService, Message.class);
    }

    @GetMapping("/get-messages-by-conversation-id/{conversationId}")
    public ResponseEntity<List<Message>> getMessagesByConversationId(@PathVariable("conversationId") Integer conversationId) {
        return ResponseEntity.ok(entityService.getMessagesByConversationId(conversationId));
    }
}
