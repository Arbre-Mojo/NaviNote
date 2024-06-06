import {EntityService} from "./entity.service";
import {StudentList} from "../model/student-list";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentListService extends EntityService<StudentList> {
  constructor(http: HttpClient) {
    super(http, "student-list");
  }

  public getAbsencesByStudentId(studentId: number): Observable<StudentList[]> {
    return this.http.get<StudentList[]>(`${this.apiBackendUrl}/${this.entityName}/get-absences-by-student-id/${studentId}`);
  }

  public getDelaysByStudentId(studentId: number): Observable<StudentList[]> {
    return this.http.get<StudentList[]>(`${this.apiBackendUrl}/${this.entityName}/get-delays-by-student-id/${studentId}`);
  }

  public getStudentListsByTimeTableId(timeTableId: number): Observable<StudentList[]> {
    return this.http.get<StudentList[]>(`${this.apiBackendUrl}/${this.entityName}/get-student-lists-by-time-table-id/${timeTableId}`);
  }
}
