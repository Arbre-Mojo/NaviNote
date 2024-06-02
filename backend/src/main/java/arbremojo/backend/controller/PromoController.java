package arbremojo.backend.controller;

import arbremojo.backend.model.Promo;
import arbremojo.backend.service.PromoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/promo")
public class PromoController extends EntityController<Promo, PromoService> {

    @Autowired
    public PromoController(PromoService promoService) {
        super(promoService, Promo.class);
    }
}
