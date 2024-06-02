package arbremojo.backend.repository.user;

import arbremojo.backend.model.user.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProfessorRepository extends JpaRepository<Professor, Integer> {

    Professor findByEmail(String email);

    Professor findByToken(String token);

    @Query("SELECT c FROM Professor c WHERE LOWER(c.firstName) LIKE %:name% OR LOWER(c.lastName) LIKE %:name%")
    List<Professor> getUsersByName(String name);

    @Modifying
    @Query("Update Professor c SET c.password = :password WHERE c.email = :email")
    Integer updatePasswordByEmail(@Param("email") String email, @Param("password") String password);

    @Modifying
    @Query("UPDATE Professor c SET c.token = :token WHERE c.email = :email")
    Integer updateTokenByEmail(@Param("email") String email, @Param("token") String token);

    @Modifying
    @Query("UPDATE Professor c SET c.token = :newToken WHERE c.token = :oldToken")
    Integer updateTokenByOldToken(@Param("oldToken") String oldToken, @Param("newToken") String newToken);

    @Modifying
    @Query("UPDATE Professor c SET c.pfpImgPath = :pfpImgPath WHERE c.email = :email")
    Integer updatePfpImgPathByEmail(@Param("email") String email, @Param("pfpImgPath") String pfpImgPath);

    @Modifying
    @Query("DELETE FROM Professor p WHERE p.professor_id = :id")
    Integer deleteEntityById(Integer id);
}
