package arbremojo.backend.service;

import arbremojo.backend.model.Course;
import arbremojo.backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CourseService extends EntityService<Course, CourseRepository>{

    @Autowired
    public CourseService(CourseRepository entityRepository) {
        super(entityRepository);
    }

    @Transactional
    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }

    public List<Course> getCoursesByCourseName(String courseName) {
        return entityRepository.getCoursesByCourseName(courseName.toLowerCase());
    }
}
