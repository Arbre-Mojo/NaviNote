package arbremojo.backend.service;

import arbremojo.backend.model.JustificationImage;
import arbremojo.backend.repository.JustificationImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JustificationImageService extends EntityService<JustificationImage, JustificationImageRepository> {

    @Autowired
    public JustificationImageService(JustificationImageRepository entityRepository) {
        super(entityRepository);
    }

    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }
}
