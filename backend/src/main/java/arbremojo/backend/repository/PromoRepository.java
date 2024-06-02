package arbremojo.backend.repository;

import arbremojo.backend.model.Promo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PromoRepository extends JpaRepository<Promo, Integer> {
    @Modifying
    @Query("DELETE FROM Promo p WHERE p.promoName = :id")
    Integer deleteEntityById(Integer id);
}
