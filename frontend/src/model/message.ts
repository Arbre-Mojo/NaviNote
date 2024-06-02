import {Admin} from "./user/admin";
import {Professor} from "./user/professor";
import {Student} from "./user/student";

export class Message {
  messageId: number | undefined;
  message: string;
  timestamp: string;

  professorId: number;
  studentId: number;
  adminId: number;
  conversationId: number;

  admin: Admin | undefined;
  professor: Professor | undefined;
  student: Student | undefined;

  constructor(message: string, timestamp: string, professorId: number, studentId: number, adminId: number, conversationId: number, messageId?: number) {
    this.messageId = messageId;
    this.message = message;
    this.timestamp = timestamp;
    this.professorId = professorId;
    this.studentId = studentId;
    this.adminId = adminId;
    this.conversationId = conversationId;
  }

  static fromJson(json: Message): Message {
    let message = new Message(json.message, json.timestamp,
      json.professorId, json.studentId, json.adminId,
      json.conversationId, json.messageId);

    if(json.admin != undefined) message.admin =  Admin.fromJson(json.admin);
    if(json.professor != undefined) message.professor = Professor.fromJson(json.professor);
    if(json.student != undefined) message.student = Student.fromJson(json.student);

    return message;
  }

  static initializeMessages(jsonMessages: Message[]): Message[] {
    let messages: Message[] = [];
    if(jsonMessages != undefined) {
      for (let jsonMessage of jsonMessages) {
        messages.push(Message.fromJson(jsonMessage));
      }
    }
    return messages;
  }
}
