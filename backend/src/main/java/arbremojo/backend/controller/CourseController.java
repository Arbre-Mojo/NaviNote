package arbremojo.backend.controller;

import arbremojo.backend.model.Course;
import arbremojo.backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/course")
public class CourseController extends EntityController<Course, CourseService> {

    @Autowired
    protected CourseController(CourseService entityService) {
        super(entityService, Course.class);
    }
}
