package arbremojo.backend.repository;

import arbremojo.backend.model.Course;
import arbremojo.backend.model.CourseList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourseListRepository extends JpaRepository<CourseList, Integer> {
    @Modifying
    @Query("DELETE FROM CourseList p WHERE p.courseListId = :id")
    Integer deleteEntityById(Integer id);

    @Query("SELECT p FROM CourseList p WHERE p.professorId = :professorId")
    List<CourseList> getCourseListsByProfessorId(Integer professorId);

    @Query("SELECT c FROM CourseList cl INNER JOIN Course c ON cl.courseId = c.courseId WHERE cl.professorId = :professorId AND " +
            "LOWER(c.courseName) LIKE %:courseName%")
    List<Course> getCoursesByCourseNameAndProfessorId(Integer professorId, String courseName);
}
