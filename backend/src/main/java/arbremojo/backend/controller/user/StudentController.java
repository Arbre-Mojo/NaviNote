package arbremojo.backend.controller.user;

import arbremojo.backend.model.user.Student;
import arbremojo.backend.service.user.StudentService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/student")
public class StudentController extends UserController<Student, StudentService> {

    protected StudentController(StudentService entityService) {
        super(entityService, Student.class);
    }
}
