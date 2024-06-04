package arbremojo.backend.service;

import arbremojo.backend.model.Course;
import arbremojo.backend.model.CourseList;
import arbremojo.backend.model.TimeTable;
import arbremojo.backend.repository.TimeTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class TimeTableService extends EntityService<TimeTable, TimeTableRepository> {

    private final CourseListService courseListService;
    private final CourseService courseService;

    @Autowired
    public TimeTableService(TimeTableRepository entityRepository, CourseListService courseListService, CourseService courseService) {
        super(entityRepository);
        this.courseListService = courseListService;
        this.courseService = courseService;
    }

    @Transactional
    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }

    public List<TimeTable> getAbsencesByStudentId(Integer studentId) {
        return entityRepository.getAbsencesByStudentId(studentId);
    }

    public List<TimeTable> getDelaysByStudentId(Integer studentId) {
        return entityRepository.getDelaysByStudentId(studentId);
    }

    public List<TimeTable> getTimeTablesByStudentId(Integer studentId) {
        return entityRepository.getTimeTablesByStudentId(studentId);
    }

    public List<TimeTable> getTimeTablesByProfessorId(Integer professorId) {
        List<CourseList> courseLists = this.courseListService.getCourseListsByProfessorId(professorId);
        List<Course> courses = new ArrayList<>();
        List<TimeTable> timeTables = new ArrayList<>();

        courseLists.forEach(courseList -> courses.add(this.courseService.findEntityById(courseList.getCourseId())));
        courses.forEach(course -> timeTables.addAll(entityRepository.getTimeTablesByCourseId(course.getCourseId())));

        return timeTables;
    }
}
