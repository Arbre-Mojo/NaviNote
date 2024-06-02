package arbremojo.backend.service.user;

import arbremojo.backend.model.query.select.ByToken;
import arbremojo.backend.model.query.update.PasswordByEmail;
import arbremojo.backend.model.query.update.PfpImgPathByEmail;
import arbremojo.backend.model.query.update.TokenByEmail;
import arbremojo.backend.model.query.update.TokenByOldToken;
import arbremojo.backend.model.user.Professor;
import arbremojo.backend.repository.user.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProfessorService extends UserService<Professor, ProfessorRepository> {

    @Autowired
    public ProfessorService(ProfessorRepository professorRepository) {
        super(professorRepository);
    }

    @Transactional
    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }

    @Override
    public Professor selectByEmail(String email) {
        return entityRepository.findByEmail(email);
    }

    @Override
    public Professor selectByToken(ByToken byToken) {
        return entityRepository.findByToken(byToken.getToken());
    }

    @Override
    public List<Professor> getUsersByName(String name) {
        return entityRepository.getUsersByName(name);
    }

    @Transactional
    @Override
    public Integer updatePasswordByEmail(PasswordByEmail passwordByEmail) {
        return entityRepository.updatePasswordByEmail(passwordByEmail.getEmail(), passwordByEmail.getNewPassword());
    }

    @Transactional
    @Override
    public Integer updateTokenByEmail(TokenByEmail tokenByEmail) {
        return entityRepository.updateTokenByEmail(tokenByEmail.getEmail(), tokenByEmail.getNewToken());
    }

    @Transactional
    @Override
    public Integer updateTokenByOldToken(TokenByOldToken tokenByOldToken) {
        return entityRepository.updateTokenByOldToken(tokenByOldToken.getOldToken(), tokenByOldToken.getNewToken());
    }

    @Transactional
    @Override
    public Integer updatePfpImgPathByEmail(PfpImgPathByEmail pfpImgPathByEmail) {
        return entityRepository.updatePfpImgPathByEmail(pfpImgPathByEmail.getEmail(), pfpImgPathByEmail.getPfpImgPath());
    }
}
