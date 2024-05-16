export class CourseList {
  courseListId: string;
  professorId: string;
  courseId: string;

  constructor(courseListId: string, professorId: string, courseId: string) {
    this.courseListId = courseListId;
    this.professorId = professorId;
    this.courseId = courseId;
  }
}
