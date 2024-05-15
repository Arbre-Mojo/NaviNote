package arbremojo.backend.service;

import arbremojo.backend.model.CourseList;
import arbremojo.backend.repository.CourseListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CourseListService extends EntityService<CourseList, CourseListRepository> {
    @Autowired
    public CourseListService(CourseListRepository entityRepository) {
        super(entityRepository);
    }

    @Transactional
    @Override
    public Integer deleteEntityById(Integer id) {
        return entityRepository.deleteEntityById(id);
    }
}
