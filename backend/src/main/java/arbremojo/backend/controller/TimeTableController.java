package arbremojo.backend.controller;

import arbremojo.backend.model.TimeTable;
import arbremojo.backend.service.TimeTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/time-table")
public class TimeTableController extends EntityController<TimeTable, TimeTableService>{

    @Autowired
    protected TimeTableController(TimeTableService entityService) {
        super(entityService, TimeTable.class);
    }

    @GetMapping("/get-absences-by-student-id/{studentId}")
    public List<TimeTable> getAbsencesByStudentId(@PathVariable("studentId") Integer studentId) {
        return entityService.getAbsencesByStudentId(studentId);
    }

    @GetMapping("/get-delays-by-student-id/{studentId}")
    public List<TimeTable> getDelaysByStudentId(@PathVariable("studentId") Integer studentId) {
        return entityService.getDelaysByStudentId(studentId);
    }
}
