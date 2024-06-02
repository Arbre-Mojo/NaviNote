import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityService } from './entity.service';
import {Message} from "../model/message";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService extends EntityService<Message> {
  constructor(http: HttpClient) {
    super(http, "message");
  }

  getMessagesByConversationId(conversationId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiBackendUrl}/${this.entityName}/get-messages-by-conversation-id/${conversationId}`);
  }
}
