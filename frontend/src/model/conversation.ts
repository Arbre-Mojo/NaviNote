import { Message } from "./message";
import {Professor} from "./user/professor";
import {Student} from "./user/student";

export class Conversation {
  conversationId: number | undefined;
  professorId: number;
  studentId: number;

  messages: Message[] = [];
  professor: Professor | undefined;
  student: Student | undefined;

  constructor(professorId: number, studentId: number, conversationId?: number) {
    this.conversationId = conversationId;
    this.professorId = professorId;
    this.studentId = studentId;
  }

  static fromJson(jsonConversation: Conversation): Conversation {
    let conversation = new Conversation(jsonConversation.professorId, jsonConversation.studentId, jsonConversation.conversationId);
    conversation.professor = Professor.fromJson(jsonConversation.professor!);
    conversation.student = Student.fromJson(jsonConversation.student!);

    return conversation;
  }

  static initializeConversations(jsonConversations: Conversation[]): Conversation[] {
    let conversations: Conversation[] = [];
    if(jsonConversations != undefined) {
      for (let jsonConversation of jsonConversations) {
        conversations.push(Conversation.fromJson(jsonConversation));
      }
    }
    return conversations;
  }

  setMessages(messages: Message[]) {
    this.messages = messages;
  }
}
