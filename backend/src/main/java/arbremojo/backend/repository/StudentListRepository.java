package arbremojo.backend.repository;

import arbremojo.backend.model.StudentList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudentListRepository extends JpaRepository<StudentList, Integer> {
    @Modifying
    @Query("DELETE FROM StudentList p WHERE p.studentListId = :id")
    Integer deleteEntityById(Integer id);

    @Query("SELECT p FROM StudentList p WHERE p.studentId = :studentId AND p.absent = true")
    List<StudentList> getAbsencesByStudentId(Integer studentId);

    @Query("SELECT p FROM StudentList p WHERE p.studentId = :studentId AND p.minutesLate > 0")
    List<StudentList> getDelaysByStudentId(Integer studentId);

    @Query("SELECT p FROM StudentList p WHERE p.timeTableId = :timeTableId")
    List<StudentList> getStudentListsByTimeTableId(Integer timeTableId);
}
