import {Justification} from "./justification";
import {TimeTable} from "./time-table";
import {Student} from "./user/student";

export class StudentList {
  studentListId: number | undefined;
  absent: boolean;
  minutesLate: number;

  timeTableId: number;
  studentId: number;

  justification: Justification | undefined;
  timeTable: TimeTable | undefined;
  student: Student | undefined;

  constructor(absent: boolean, minutesLate: number, timeTableId: number, studentId: number, studentListId?: number) {
    this.absent = absent;
    this.minutesLate = minutesLate;
    this.timeTableId = timeTableId;
    this.studentId = studentId;
    this.studentListId = studentListId;
  }

  static fromJson(jsonStudentList: StudentList): StudentList {
    let studentList = new StudentList(jsonStudentList.absent, jsonStudentList.minutesLate, jsonStudentList.timeTableId,
      jsonStudentList.studentId, jsonStudentList.studentListId);
    if(jsonStudentList.justification != undefined) studentList.justification = Justification.fromJson(jsonStudentList.justification);
    if(jsonStudentList.timeTable != undefined) studentList.timeTable = TimeTable.fromJson(jsonStudentList.timeTable);
    if(jsonStudentList.student != undefined) studentList.student = Student.fromJson(jsonStudentList.student);

    return studentList;
  }

  static initializeStudentLists(jsonStudentLists: StudentList[]): StudentList[] {
    let studentLists: StudentList[] = [];
    if(jsonStudentLists != undefined) {
      for(let jsonStudentList of jsonStudentLists) {
        studentLists.push(StudentList.fromJson(jsonStudentList));
      }
    }
    return studentLists;
  }
}
