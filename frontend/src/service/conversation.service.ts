import {EntityService} from "./entity.service";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Conversation} from "../model/conversation";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConversationService extends EntityService<Conversation> {
  constructor(http: HttpClient) {
    super(http, "conversation");
  }

  getConversationsByStudentId(studentId: number): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.apiBackendUrl}/${this.entityName}/get-conversations-by-student-id/${studentId}`);
  }

  getConversationsByProfessorId(professorId: number): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.apiBackendUrl}/${this.entityName}/get-conversations-by-professor-id/${professorId}`);
  }
}
