package arbremojo.backend.controller;

import arbremojo.backend.model.Course;
import arbremojo.backend.service.CourseService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/course")
public class CourseController extends EntityController<Course, CourseService> {
    protected CourseController(CourseService entityService) {
        super(entityService, Course.class);
    }
}
