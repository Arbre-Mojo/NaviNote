import {HttpClient} from "@angular/common/http";
import {EntityService} from "./entity.service";
import {TimeTable} from "../model/time-table";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimeTableService extends EntityService<TimeTable> {
  constructor(http: HttpClient) {
    super(http, "time-table");
  }

  public getAbsencesByStudentId(studentId: number): Observable<TimeTable[]> {
    return this.http.get<TimeTable[]>(`${this.apiBackendUrl}/${this.entityName}/get-absences-by-student-id/${studentId}`);
  }

  public getDelaysByStudentId(studentId: number): Observable<TimeTable[]> {
    return this.http.get<TimeTable[]>(`${this.apiBackendUrl}/${this.entityName}/get-delays-by-student-id/${studentId}`);
  }
}
