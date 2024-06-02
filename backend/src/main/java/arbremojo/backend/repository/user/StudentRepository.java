package arbremojo.backend.repository.user;

import arbremojo.backend.model.user.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    Student findByEmail(String email);

    Student findByToken(String token);

    @Query("SELECT c FROM Student c WHERE LOWER(c.firstName) LIKE %:name% OR LOWER(c.lastName) LIKE %:name%")
    List<Student> getUsersByName(String name);

    @Modifying
    @Query("Update Student c SET c.password = :password WHERE c.email = :email")
    Integer updatePasswordByEmail(@Param("email") String email, @Param("password") String password);

    @Modifying
    @Query("UPDATE Student c SET c.token = :token WHERE c.email = :email")
    Integer updateTokenByEmail(@Param("email") String email, @Param("token") String token);

    @Modifying
    @Query("UPDATE Student c SET c.token = :newToken WHERE c.token = :oldToken")
    Integer updateTokenByOldToken(@Param("oldToken") String oldToken, @Param("newToken") String newToken);

    @Modifying
    @Query("UPDATE Student c SET c.pfpImgPath = :pfpImgPath WHERE c.email = :email")
    Integer updatePfpImgPathByEmail(@Param("email") String email, @Param("pfpImgPath") String pfpImgPath);

    @Modifying
    @Query("DELETE FROM Student p WHERE p.studentId = :id")
    Integer deleteEntityById(Integer id);
}
