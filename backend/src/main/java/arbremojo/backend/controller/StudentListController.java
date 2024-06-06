package arbremojo.backend.controller;

import arbremojo.backend.model.StudentList;
import arbremojo.backend.service.StudentListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/student-list")
public class StudentListController extends EntityController<StudentList, StudentListService> {

    @Autowired
    protected StudentListController(StudentListService entityService) {
        super(entityService, StudentList.class);
    }

    @GetMapping("/get-absences-by-student-id/{studentId}")
    public ResponseEntity<List<StudentList>> getAbsencesByStudentId(@PathVariable("studentId") Integer studentId) {
        return ResponseEntity.ok(entityService.getAbsencesByStudentId(studentId));
    }

    @GetMapping("/get-delays-by-student-id/{studentId}")
    public ResponseEntity<List<StudentList>> getDelaysByStudentId(@PathVariable("studentId") Integer studentId) {
        return ResponseEntity.ok(entityService.getDelaysByStudentId(studentId));
    }

    @GetMapping("/get-student-lists-by-time-table-id/{timeTableId}")
    public ResponseEntity<List<StudentList>> getStudentListsByTimeTableId(@PathVariable("timeTableId") Integer timeTableId) {
        return ResponseEntity.ok(entityService.getStudentListsByTimeTableId(timeTableId));
    }
}
