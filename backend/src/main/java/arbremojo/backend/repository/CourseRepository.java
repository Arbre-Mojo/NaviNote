package arbremojo.backend.repository;

import arbremojo.backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Integer> {
    @Modifying
    @Query("DELETE FROM Course p WHERE p.courseId = :id")
    Integer deleteEntityById(Integer id);

    @Query("SELECT p FROM Course p WHERE LOWER(p.courseName) LIKE %:courseName%")
    List<Course> getCoursesByCourseName(String courseName);
}
