import {JustificationImage} from "./justification-image";
import {Student} from "./user/student";
import {TimeTable} from "./time-table";

export class Justification {
  justificationId: number | undefined;
  reason: string;
  accepted: boolean | null | undefined;

  timeTableId: number;
  studentId: number;

  justificationImageList: JustificationImage[] = [];

  student: Student | undefined;
  timeTable: TimeTable | undefined;


  constructor(reason: string, timeTableId: number, studentId: number, accepted: boolean | null | undefined = null, justificationId?: number) {
    this.reason = reason;
    this.accepted = accepted;
    this.timeTableId = timeTableId;
    this.studentId = studentId;
    this.justificationId = justificationId;
  }

  static fromJson(json: Justification): Justification {
    let justification = new Justification(json.reason, json.timeTableId, json.studentId, json.accepted, json.justificationId);

    justification.justificationImageList = JustificationImage.initializeJustificationImages(json.justificationImageList);
    if(json.student != undefined) justification.student = Student.fromJson(json.student!);
    if(json.timeTable != undefined) justification.timeTable = TimeTable.fromJson(json.timeTable!);

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
