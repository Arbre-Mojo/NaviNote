package arbremojo.backend.controller;

import arbremojo.backend.model.TimeTable;
import arbremojo.backend.model.query.select.ByCourseBody;
import arbremojo.backend.service.TimeTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/time-table")
public class TimeTableController extends EntityController<TimeTable, TimeTableService>{

    @Autowired
    protected TimeTableController(TimeTableService entityService) {
        super(entityService, TimeTable.class);
    }

    @GetMapping("/get-absences-by-student-id/{studentId}")
    public ResponseEntity<List<TimeTable>> getAbsencesByStudentId(@PathVariable("studentId") Integer studentId) {
        return ResponseEntity.ok(entityService.getAbsencesByStudentId(studentId));
    }

    @GetMapping("/get-delays-by-student-id/{studentId}")
    public ResponseEntity<List<TimeTable>> getDelaysByStudentId(@PathVariable("studentId") Integer studentId) {
        return ResponseEntity.ok(entityService.getDelaysByStudentId(studentId));
    }

    @GetMapping("/get-time-tables-by-student-id/{studentId}")
    public ResponseEntity<List<TimeTable>> getTimeTablesByStudentId(@PathVariable("studentId") Integer studentId) {
        return ResponseEntity.ok(entityService.getTimeTablesByStudentId(studentId));
    }

    @GetMapping("/get-time-tables-by-professor-id/{professorId}")
    public ResponseEntity<List<TimeTable>> getTimeTablesByProfessorId(@PathVariable("professorId") Integer professorId) {
        return ResponseEntity.ok(entityService.getTimeTablesByProfessorId(professorId));
    }

    @PostMapping("/get-time-tables-by-course-name-and-interval")
    public ResponseEntity<List<TimeTable>> getTimeTablesByCourseNameAndInterval(@RequestBody ByCourseBody byCourseBody) {
        return ResponseEntity.ok(entityService.getTimeTablesByCourseNameAndInterval(byCourseBody));
    }
}
