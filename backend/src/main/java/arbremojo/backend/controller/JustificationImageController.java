package arbremojo.backend.controller;

import arbremojo.backend.model.JustificationImage;
import arbremojo.backend.service.JustificationImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/justification-image")
public class JustificationImageController extends EntityController<JustificationImage, JustificationImageService> {

    @Autowired
    protected JustificationImageController(JustificationImageService entityService) {
        super(entityService, JustificationImage.class);
    }
}
