import {Course} from "./course";
import {Justification} from "./justification";
import {getDateString, getTimeString} from "../app/component/misc/functions";

export class TimeTable {
  timeTableId: number | undefined;

  studentId: number;
  courseId: string;
  timeStart: string;
  timeEnd: string;
  room: string;
  campus: string;

  course: Course | undefined;

  constructor(studentId: number, courseId: string, timeStart: string, timeEnd: string, room: string, campus: string, timeTableId?: number) {
    this.timeTableId = timeTableId;
    this.studentId = studentId;
    this.courseId = courseId;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
    this.room = room;
    this.campus = campus;
  }

  static fromJson(jsonTimeTable: TimeTable): TimeTable {
    let timeTable = new TimeTable(jsonTimeTable.studentId,
      jsonTimeTable.courseId, jsonTimeTable.timeStart,
      jsonTimeTable.timeEnd, jsonTimeTable.room, jsonTimeTable.campus,
      jsonTimeTable.timeTableId);
    if(jsonTimeTable.course != undefined) timeTable.course = Course.fromJson(jsonTimeTable.course);

    return timeTable;
  }

  static initializeTimeTables(jsonTimeTables: TimeTable[]): TimeTable[] {
    let timeTables: TimeTable[] = [];
    if(jsonTimeTables != undefined) {
      for(let jsonTimeTable of jsonTimeTables) {
        timeTables.push(TimeTable.fromJson(jsonTimeTable));
      }
    }
    return timeTables;
  }

  toString(): string {
    let timeStartDate = new Date(this.timeStart);
    let timeEndDate = new Date(this.timeEnd);

    return `${this.course?.courseName} - ${getDateString(timeStartDate)} - From ${getTimeString(timeStartDate)} to ${getTimeString(timeEndDate)}`;

  }
}
