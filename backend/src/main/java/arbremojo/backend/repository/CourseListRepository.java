package arbremojo.backend.repository;

import arbremojo.backend.model.CourseList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CourseListRepository extends JpaRepository<CourseList, Integer> {
    @Modifying
    @Query("DELETE FROM CourseList p WHERE p.courseListId = :id")
    Integer deleteEntityById(Integer id);
}
