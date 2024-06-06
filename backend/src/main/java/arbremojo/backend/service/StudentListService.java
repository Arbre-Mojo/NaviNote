package arbremojo.backend.service;

import arbremojo.backend.model.StudentList;
import arbremojo.backend.repository.StudentListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StudentListService extends EntityService<StudentList, StudentListRepository> {

        @Autowired
        public StudentListService(StudentListRepository entityRepository) {
            super(entityRepository);
        }

        @Transactional
        @Override
        public Integer deleteEntityById(Integer id) {
            return entityRepository.deleteEntityById(id);
        }

        public List<StudentList> getAbsencesByStudentId(Integer studentId) {
            return entityRepository.getAbsencesByStudentId(studentId);
        }

        public List<StudentList> getDelaysByStudentId(Integer studentId) {
            return entityRepository.getDelaysByStudentId(studentId);
        }

        public List<StudentList> getStudentListsByTimeTableId(Integer timeTableId) {
            return entityRepository.getStudentListsByTimeTableId(timeTableId);
        }
}
