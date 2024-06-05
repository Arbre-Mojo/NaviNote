package arbremojo.backend.repository;

import arbremojo.backend.model.TimeTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.Date;
import java.util.List;

public interface TimeTableRepository extends JpaRepository<TimeTable, Integer> {
    @Modifying
    @Query("DELETE FROM TimeTable p WHERE p.timeTableId = :id")
    Integer deleteEntityById(Integer id);

    @Query("SELECT p FROM TimeTable p WHERE p.studentId = :studentId AND p.absent = true")
    List<TimeTable> getAbsencesByStudentId(Integer studentId);

    @Query("SELECT p FROM TimeTable p WHERE p.studentId = :studentId AND p.minutesLate > 0")
    List<TimeTable> getDelaysByStudentId(Integer studentId);

    @Query("SELECT p FROM TimeTable p WHERE p.studentId = :studentId")
    List<TimeTable> getTimeTablesByStudentId(Integer studentId);

    @Query("SELECT p FROM TimeTable p WHERE p.courseId = :courseId")
    List<TimeTable> getTimeTablesByCourseId(Integer courseId);

    @Query("SELECT p FROM TimeTable p WHERE p.courseId = :courseId AND p.timeStart >= :timeStart AND p.timeEnd <= :timeEnd")
    List<TimeTable> getTimeTablesByCourseIdAndInterval(Integer courseId, Timestamp timeStart, Timestamp timeEnd);
}
