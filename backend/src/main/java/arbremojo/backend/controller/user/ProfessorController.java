package arbremojo.backend.controller.user;

import arbremojo.backend.model.user.Professor;
import arbremojo.backend.service.user.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/professor")
public class ProfessorController extends UserController<Professor, ProfessorService> {

    @Autowired
    protected ProfessorController(ProfessorService entityService) {
        super(entityService, Professor.class);
    }
}
