package arbremojo.backend.model.misc;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class PostBody {
    private Integer id;
    private List<Integer> excludeIds = new ArrayList<>();
    private int limit = 10;
}
