package arbremojo.backend.controller;

import arbremojo.backend.model.TimeTable;
import arbremojo.backend.service.TimeTableService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/time-table")
public class TimeTableController extends EntityController<TimeTable, TimeTableService>{
    protected TimeTableController(TimeTableService entityService) {
        super(entityService, TimeTable.class);
    }
}
