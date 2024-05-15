package arbremojo.backend.repository;

import arbremojo.backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CourseRepository extends JpaRepository<Course, Integer> {
    @Modifying
    @Query("DELETE FROM Course p WHERE p.courseId = :id")
    Integer deleteEntityById(Integer id);
}
