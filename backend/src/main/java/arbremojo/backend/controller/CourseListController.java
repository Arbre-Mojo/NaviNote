package arbremojo.backend.controller;

import arbremojo.backend.model.CourseList;
import arbremojo.backend.service.CourseListService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/course-list")
public class CourseListController extends EntityController<CourseList, CourseListService>{
    protected CourseListController(CourseListService entityService) {
        super(entityService, CourseList.class);
    }
}
