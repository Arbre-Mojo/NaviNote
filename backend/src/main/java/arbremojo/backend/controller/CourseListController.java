package arbremojo.backend.controller;

import arbremojo.backend.model.CourseList;
import arbremojo.backend.service.CourseListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/course-list")
public class CourseListController extends EntityController<CourseList, CourseListService> {

    @Autowired
    protected CourseListController(CourseListService entityService) {
        super(entityService, CourseList.class);
    }
}
