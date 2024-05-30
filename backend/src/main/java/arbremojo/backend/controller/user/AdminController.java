package arbremojo.backend.controller.user;

import arbremojo.backend.model.user.Admin;
import arbremojo.backend.service.user.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController extends UserController<Admin, AdminService> {
    @Autowired
    protected AdminController(AdminService entityService) {
        super(entityService, Admin.class);
    }
}
