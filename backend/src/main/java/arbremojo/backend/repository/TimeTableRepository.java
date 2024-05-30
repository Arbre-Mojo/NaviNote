package arbremojo.backend.repository;

import arbremojo.backend.model.TimeTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface TimeTableRepository extends JpaRepository<TimeTable, Integer> {
    @Modifying
    @Query("DELETE FROM TimeTable p WHERE p.timeTableId = :id")
    Integer deleteEntityById(Integer id);
}
