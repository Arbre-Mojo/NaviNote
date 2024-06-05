package arbremojo.backend.model.query.select;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ByCourseBody {
    private String courseName;
    private String timeStart;
    private String timeEnd;
    private Integer professorId;
}
