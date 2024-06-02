package arbremojo.backend.service;

import arbremojo.backend.model.TimeTable;
import arbremojo.backend.repository.TimeTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TimeTableService extends EntityService<TimeTable, TimeTableRepository> {

    @Autowired
    public TimeTableService(TimeTableRepository entityRepository) {
        super(entityRepository);
    }

    @Transactional
    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }

    public List<TimeTable> getAbsencesByStudentId(Integer studentId) {
        return entityRepository.getAbsencesByStudentId(studentId);
    }

    public List<TimeTable> getDelaysByStudentId(Integer studentId) {
        return entityRepository.getDelaysByStudentId(studentId);
    }
}
