import {Injectable} from "@angular/core";
import {EntityService} from "./entity.service";
import {HttpClient} from "@angular/common/http";
import {Justification} from "../model/justification";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JustificationService extends EntityService<Justification> {
  constructor(http: HttpClient) {
    super(http, "justification");
  }

  public findJustificationByStudentListId(studentListId: number): Observable<Justification> {
    return this.http.get<Justification>(`${this.apiBackendUrl}/${this.entityName}/find-justification-by-student-list-id/${studentListId}`);
  }
}
