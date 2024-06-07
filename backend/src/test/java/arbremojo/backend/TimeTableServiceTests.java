import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import arbremojo.backend.service.*;
import arbremojo.backend.controller.*;
import arbremojo.backend.repository.*;
import arbremojo.backend.model.*;
import arbremojo.backend.model.query.select.*;
class TimeTableServiceTest {

    @Mock
    private TimeTableRepository timeTableRepository;

    @Mock
    private CourseListService courseListService;

    @Mock
    private CourseService courseService;

    private TimeTableService timeTableService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        timeTableService = new TimeTableService(timeTableRepository, courseListService, courseService);
    }

    @Test
    @DisplayName("Delete entity by id successfully")
    void deleteEntityByIdSuccessfully() {
        when(timeTableRepository.deleteEntityById(1)).thenReturn(1);

        Integer result = timeTableService.deleteEntityById(1);

        assertEquals(1, result);
        verify(timeTableRepository, times(1)).deleteEntityById(1);
    }

    @Test
    @DisplayName("Get time tables by student id successfully")
    void getTimeTablesByStudentIdSuccessfully() {
        List<TimeTable> timeTables = Arrays.asList(new TimeTable(), new TimeTable());
        when(timeTableRepository.getTimeTablesByStudentId(1)).thenReturn(timeTables);

        List<TimeTable> result = timeTableService.getTimeTablesByStudentId(1);

        assertEquals(timeTables, result);
        verify(timeTableRepository, times(1)).getTimeTablesByStudentId(1);
    }

    @Test
    @DisplayName("Get time tables by professor id successfully")
    void getTimeTablesByProfessorIdSuccessfully() {
        CourseList courseList = new CourseList();
        courseList.setCourseId(1);
        List<CourseList> courseLists = Arrays.asList(courseList);

        Course course = new Course();
        course.setCourseId(1);
        List<Course> courses = Arrays.asList(course);

        TimeTable timeTable = new TimeTable();
        timeTable.setCourseId(1);
        List<TimeTable> timeTables = Arrays.asList(timeTable);

        when(courseListService.getCourseListsByProfessorId(1)).thenReturn(courseLists);
        when(courseService.findEntityById(1)).thenReturn(course);
        when(timeTableRepository.getTimeTablesByCourseId(1)).thenReturn(timeTables);

        List<TimeTable> result = timeTableService.getTimeTablesByProfessorId(1);

        assertEquals(timeTables, result);
        verify(courseListService, times(1)).getCourseListsByProfessorId(1);
        verify(courseService, times(1)).findEntityById(1);
        verify(timeTableRepository, times(1)).getTimeTablesByCourseId(1);
    }

    @Test
    @DisplayName("Get time tables by course name and interval successfully")
    void getTimeTablesByCourseNameAndIntervalSuccessfully() {
        ByCourseBody byCourseBody = new ByCourseBody();
        byCourseBody.setCourseName("courseName");
        byCourseBody.setTimeStart("2022-01-01 00:00:00");
        byCourseBody.setTimeEnd("2022-12-31 23:59:59");

        Course course = new Course();
        course.setCourseId(1);
        List<Course> courses = Arrays.asList(course);

        TimeTable timeTable = new TimeTable();
        timeTable.setCourseId(1);
        List<TimeTable> timeTables = Arrays.asList(timeTable);

        when(courseService.getCoursesByCourseName("courseName")).thenReturn(courses);
        when(timeTableRepository.getTimeTablesByCourseIdAndInterval(1, Timestamp.valueOf("2022-01-01 00:00:00"), Timestamp.valueOf("2022-12-31 23:59:59"))).thenReturn(timeTables);

        List<TimeTable> result = timeTableService.getTimeTablesByCourseNameAndInterval(byCourseBody);

        assertEquals(timeTables, result);
        verify(courseService, times(1)).getCoursesByCourseName("courseName");
        verify(timeTableRepository, times(1)).getTimeTablesByCourseIdAndInterval(1, Timestamp.valueOf("2022-01-01 00:00:00"), Timestamp.valueOf("2022-12-31 23:59:59"));
    }
}