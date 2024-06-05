import {HttpClient} from "@angular/common/http";
import {EntityService} from "./entity.service";
import {TimeTable} from "../model/time-table";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ByCourseBody} from "../model/query/select/by-course-name-and-interval";

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

  public getTimeTablesByStudentId(studentId: number): Observable<TimeTable[]> {
    return this.http.get<TimeTable[]>(`${this.apiBackendUrl}/${this.entityName}/get-time-tables-by-student-id/${studentId}`);
  }

  public getTimeTablesByProfessorId(professorId: number) {
    return this.http.get<TimeTable[]>(`${this.apiBackendUrl}/${this.entityName}/get-time-tables-by-professor-id/${professorId}`);
  }

  public getTimeTablesByCourseNameAndInterval(byCourseNameAndInterval: ByCourseBody) {
    return this.http.post<TimeTable[]>(`${this.apiBackendUrl}/${this.entityName}/get-time-tables-by-course-name-and-interval`, byCourseNameAndInterval);
  }
}
