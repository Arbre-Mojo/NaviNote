package arbremojo.backend.controller;

import arbremojo.backend.model.Justification;
import arbremojo.backend.service.JustificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/justification")
public class JustificationController extends EntityController<Justification, JustificationService> {

    @Autowired
    protected JustificationController(JustificationService entityService) {
        super(entityService, Justification.class);
    }

    @GetMapping("/find-justification-by-student-list-id/{studentListId}")
    public Justification findJustificationByStudentListId(@PathVariable Integer studentListId) {
        return entityService.findJustificationByStudentListId(studentListId);
    }
}
