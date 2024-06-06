import {TimeTable} from "../../model/time-table";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private _timeTable!: TimeTable | undefined;

  get timeTable(): TimeTable | undefined {
    return this._timeTable;
  }
  set timeTable(value: TimeTable | undefined) {
    this._timeTable = value;
  }
}
