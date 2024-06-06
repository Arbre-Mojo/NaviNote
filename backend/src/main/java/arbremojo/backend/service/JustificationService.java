package arbremojo.backend.service;

import arbremojo.backend.model.Justification;
import arbremojo.backend.repository.JustificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JustificationService extends EntityService<Justification, JustificationRepository> {

    @Autowired
    public JustificationService(JustificationRepository entityRepository) {
        super(entityRepository);
    }

    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }

    public Justification findJustificationByStudentListId(Integer studentListId) {
        return entityRepository.findJustificationByStudentListId(studentListId);
    }
}
