package arbremojo.backend.service;

import arbremojo.backend.model.Promo;
import arbremojo.backend.repository.PromoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PromoService extends EntityService<Promo, PromoRepository> {

    @Autowired
    public PromoService(PromoRepository entityRepository) {
        super(entityRepository);
    }

    @Transactional
    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }
}
