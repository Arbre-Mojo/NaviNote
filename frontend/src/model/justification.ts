import {JustificationImage} from "./justification-image";
import {Student} from "./user/student";
import {StudentList} from "./student-list";

export class Justification {
  justificationId: number | undefined;
  reason: string;
  accepted: boolean | null | undefined;

  studentListId: number;
  studentId: number;

  justificationImageList: JustificationImage[] = [];

  student: Student | undefined;
  studentList: StudentList | undefined;

  constructor(reason: string, studentListId: number, studentId: number, accepted: boolean | null | undefined = null, justificationId?: number) {
    this.reason = reason;
    this.accepted = accepted;
    this.studentListId = studentListId;
    this.studentId = studentId;
    this.justificationId = justificationId;
  }

  static fromJson(json: Justification): Justification {
    let justification = new Justification(json.reason, json.studentListId, json.studentId, json.accepted, json.justificationId);

    justification.justificationImageList = JustificationImage.initializeJustificationImages(json.justificationImageList);
    if (json.student != undefined) justification.student = Student.fromJson(json.student!);
    if (json.studentList != undefined) justification.studentList = StudentList.fromJson(json.studentList!);

    return justification;
  }

  static initializeJustifications(json: Justification[]): Justification[] {
    let justifications: Justification[] = [];
    for (let i = 0; i < json.length; i++) {
      justifications.push(Justification.fromJson(json[i]));
    }
    return justifications;
  }
}
