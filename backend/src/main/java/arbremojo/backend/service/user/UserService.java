package arbremojo.backend.service.user;

import arbremojo.backend.model.query.select.ByToken;
import arbremojo.backend.model.query.update.PasswordByEmail;
import arbremojo.backend.model.query.update.PfpImgPathByEmail;
import arbremojo.backend.model.query.update.TokenByEmail;
import arbremojo.backend.model.query.update.TokenByOldToken;
import arbremojo.backend.service.EntityService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public abstract class UserService<T, R extends JpaRepository<T, Integer>> extends EntityService<T, R> {
    public UserService(R entityRepository) {
        super(entityRepository);
    }
    public abstract T selectByEmail(String email);
    public abstract T selectByToken(ByToken byToken);
    public abstract List<T> getUsersByName(String name);
    public abstract Integer updatePasswordByEmail(PasswordByEmail passwordByEmail);
    public abstract Integer updateTokenByEmail(TokenByEmail tokenByEmail);
    public abstract Integer updateTokenByOldToken(TokenByOldToken tokenByOldToken);
    public abstract Integer updatePfpImgPathByEmail(PfpImgPathByEmail pfpImgPathByEmail);
}
