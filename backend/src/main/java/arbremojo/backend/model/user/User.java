package arbremojo.backend.model.user;

public abstract class User {
    public abstract int getUserId();
    public abstract String getFirstName();
    public abstract String getLastName();
    public abstract String getEmail();
    public abstract String getPassword();
    public abstract String getToken();
    public abstract String getPfpImgPath();
}
