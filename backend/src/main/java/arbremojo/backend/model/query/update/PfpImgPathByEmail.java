package arbremojo.backend.model.query.update;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PfpImgPathByEmail {
    private String email;
    private String pfpImgPath;

    public PfpImgPathByEmail(String email, String pfpImgPath) {
        this.email = email;
        this.pfpImgPath = pfpImgPath;
    }
}
