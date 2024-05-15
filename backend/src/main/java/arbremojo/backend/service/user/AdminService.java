package arbremojo.backend.service.user;

import arbremojo.backend.model.query.select.ByToken;
import arbremojo.backend.model.query.update.PasswordByEmail;
import arbremojo.backend.model.query.update.PfpImgPathByEmail;
import arbremojo.backend.model.query.update.TokenByEmail;
import arbremojo.backend.model.query.update.TokenByOldToken;
import arbremojo.backend.model.user.Admin;
import arbremojo.backend.repository.user.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminService extends UserService<Admin, AdminRepository> {

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        super(adminRepository);
    }

    @Transactional
    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }

    @Override
    public Admin selectByEmail(String email) {
        return entityRepository.findByEmail(email);
    }

    @Override
    public Admin selectByToken(ByToken byToken) {
        return entityRepository.findByToken(byToken.getToken());
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
