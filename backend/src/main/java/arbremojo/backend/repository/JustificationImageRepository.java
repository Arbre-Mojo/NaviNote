package arbremojo.backend.repository;

import arbremojo.backend.model.JustificationImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface JustificationImageRepository extends JpaRepository<JustificationImage, Integer> {
    @Modifying
    @Query("DELETE FROM JustificationImage p WHERE p.justificationImageId = :id")
    Integer deleteEntityById(Integer id);
}
