import {User} from "../../../../model/user/user";
import {adminCategory, professorCategory, studentCategory, UserCategory} from "../../../../service/user/userCategories";
import {Message} from "../../../../model/message";

export class MessageListElement {
  message: Message;
  currentUserCategory: UserCategory;
  currentUser!: User;

  messageType!: MessageType;
  position!: MessagePosition;

  owner!: User;

  constructor(message: Message, currentUser: User, currentUserCategory: UserCategory) {
    this.message = message;
    this.currentUserCategory = currentUserCategory;
    this.currentUser = currentUser;
    this.setMessageParams();
  }

  private setMessageParams() {
    if ((this.message.adminId == this.currentUser.getUserId() && this.currentUserCategory.name == adminCategory.name) ||
      (this.message.studentId == this.currentUser.getUserId() && this.currentUserCategory.name == studentCategory.name) ||
      (this.message.professorId == this.currentUser.getUserId() && this.currentUserCategory.name == professorCategory.name)) {
      this.position = MessagePosition.END;
    } else {
      this.position = MessagePosition.START;
    }

    if (this.message.adminId > 0) {
      this.messageType = adminMessageType;
      this.owner = this.message.admin!;
    } else if (this.message.studentId > 0) {
      this.messageType = studentMessageType;
      this.owner = this.message.student!;
    } else if (this.message.professorId > 0) {
      this.messageType = professorMessageType;
      this.owner = this.message.professor!;
    }
  }
}

class MessageType {
  userCategory: UserCategory;
  backgroundClass: string;

  constructor(userCategory: UserCategory, backgroundClass: string) {
    this.userCategory = userCategory;
    this.backgroundClass = backgroundClass;
  }
}

enum MessagePosition {
  START = "start",
  END = "end",
}

export const adminMessageType = new MessageType(adminCategory, "admin-message-type");
export const studentMessageType = new MessageType(studentCategory, "student-message-type");
export const professorMessageType = new MessageType(professorCategory, "professor-message-type");
