export class Course {
  courseId: string;
  courseName: string;

  constructor(courseId: string, courseName: string) {
    this.courseId = courseId;
    this.courseName = courseName;
  }

  static fromJson(jsonCourse: Course): Course {
    return new Course(jsonCourse.courseId, jsonCourse.courseName);
  }

  static initializeCourses(jsonCourses: Course[]): Course[] {
    let courses: Course[] = [];
    for(let jsonCourse of jsonCourses) {
      courses.push(Course.fromJson(jsonCourse));
    }
    return courses;
  }
}
