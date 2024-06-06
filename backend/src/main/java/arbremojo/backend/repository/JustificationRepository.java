package arbremojo.backend.repository;

import arbremojo.backend.model.Justification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface JustificationRepository extends JpaRepository<Justification, Integer> {
    @Modifying
    @Query("DELETE FROM Justification p WHERE p.justificationId = :id")
    Integer deleteEntityById(Integer id);

    @Query("SELECT p FROM Justification p WHERE p.studentListId = :studentListId")
    Justification findJustificationByStudentListId(Integer studentListId);
}
