package arbremojo.backend.controller.user;

import arbremojo.backend.controller.EntityController;
import arbremojo.backend.model.query.select.ByToken;
import arbremojo.backend.model.query.update.PasswordByEmail;
import arbremojo.backend.model.query.update.PfpImgPathByEmail;
import arbremojo.backend.model.query.update.TokenByEmail;
import arbremojo.backend.model.query.update.TokenByOldToken;
import arbremojo.backend.service.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public abstract class UserController<T, S extends UserService<T, ?>> extends EntityController<T, S> {

    protected UserController(S entityService, Class<T> entityClass) {
        super(entityService, entityClass);
    }
    @GetMapping("/select-user-by-email/{email}")
    public ResponseEntity<T> selectUserByEmail(@PathVariable("email") String email) {
        return ResponseEntity.ok(entityService.selectByEmail(email));
    }

    @PostMapping("/select-user-by-token")
    public ResponseEntity<T> selectUserByToken(@RequestBody ByToken byToken) {
        return ResponseEntity.ok(entityService.selectByToken(byToken));
    }

    @GetMapping("/get-users-by-name/{name}")
    public ResponseEntity<List<T>> getUsersByName(@PathVariable("name") String name) {
        return ResponseEntity.ok(entityService.getUsersByName(name.toLowerCase()));
    }

    @PostMapping("/update-password-by-email")
    public ResponseEntity<Integer> updatePasswordByEmail(@RequestBody PasswordByEmail passwordByEmail) {
        return ResponseEntity.ok(entityService.updatePasswordByEmail(passwordByEmail));
    }

    @PostMapping("/update-token-by-email")
    public ResponseEntity<Integer> updateTokenByEmail(@RequestBody TokenByEmail tokenByEmail) {
        return ResponseEntity.ok(entityService.updateTokenByEmail(tokenByEmail));
    }

    @PostMapping("/update-token-by-old-token")
    public ResponseEntity<Integer> updateTokenByOldToken(@RequestBody TokenByOldToken tokenByOldToken) {
        return ResponseEntity.ok(entityService.updateTokenByOldToken(tokenByOldToken));
    }

    @PostMapping("/update-pfp-img-path-by-email")
    public ResponseEntity<Integer> updatePfpImgPathByEmail(@RequestBody PfpImgPathByEmail pfpImgPathByEmail) {
        return ResponseEntity.ok(entityService.updatePfpImgPathByEmail(pfpImgPathByEmail));
    }

    @Override
    public ResponseEntity<List<String>> uploadFiles(@RequestParam("files") List<MultipartFile> multipartFiles)
            throws IOException {
        List<String> fileNames = fileService.uploadFiles(multipartFiles, entityClass.getSimpleName().toLowerCase());

        return ResponseEntity.ok(fileNames);
    }
}
