export class ByCourseBody {
  courseName: string;
  timeStart: string;
  timeEnd: string;
  professorId: number | undefined;

  constructor(courseName: string, timeStart: string, timeEnd: string, professorId?: number) {
    this.courseName = courseName;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
    this.professorId = professorId;
  }
}
