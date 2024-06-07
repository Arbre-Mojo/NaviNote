import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {faMessage} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";

import {CookieComponent} from "../misc/cookie-component";
import {NgForOf, NgIf} from "@angular/common";
import {MessageListElementComponent} from "./message-list-element/message-list-element.component";
import {MessageListElement} from "./message-list-element/message-list-element";
import {FormsModule} from "@angular/forms";
import {messagesNavigationItem} from "../navigation-menu/navigation-item";
import {ConversationElementComponent} from "./conversation-element/conversation-element.component";
import {ConversationElement} from "./conversation-element/conversation-element";
import {HttpErrorResponse} from "@angular/common/http";
import {getCurrentDate, getCurrentTimeStamp} from "../misc/functions";
import {MessageService} from "../../../service/message.service";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {ProfessorService} from "../../../service/user/professor.service";
import {StudentService} from "../../../service/user/student.service";
import {AdminService} from "../../../service/user/admin.service";
import { Message } from '../../../model/message';
import {ConversationService} from "../../../service/conversation.service";
import {Conversation} from "../../../model/conversation";
import {AutoCompleteModule} from "primeng/autocomplete";
import {User} from "../../../model/user/user";
import {adminCategory, professorCategory, studentCategory, UserCategory} from "../../../service/user/userCategories";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf,
    MessageListElementComponent,
    FormsModule,
    NgIf,
    ConversationElementComponent,
    AutoCompleteModule
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent extends CookieComponent implements OnInit {
  messagesNavigationItem = messagesNavigationItem;

  messageListElements: MessageListElement[] = [];
  conversationElements: ConversationElement[] = [];
  selectedConversationElement: ConversationElement | undefined;

  conversations: Conversation[] = [];

  messageTyped: string = "";
  placeholder: string = "";

  @ViewChild('messageAreaDiv') messageAreaDiv!: ElementRef;
  selectedUser: User | string | undefined;
  foundUsers: User[] = [];

  constructor(public el: ElementRef,
              override messageService: MessageService,
              override conversationService: ConversationService,
              protected override currentUserService: CurrentUserService,
              protected override adminService: AdminService,
              override studentService: StudentService,
              protected override professorService: ProfessorService,
              protected override cookieService: CookieService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
    this.placeholder = `Search for a ${this.isProfessorCategory() ? 'Student' : 'Professor'}...`
  }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      let id = params['id'];

      this.initializeUserByToken().then(() => {
        this.loggedInPage();

        new Promise<boolean>((resolve, reject) => {
          if(this.isStudentCategory()) {
            this.conversationService.getConversationsByStudentId(this.currentUserService.user?.getUserId()!).subscribe({
              next: (jsonConversations: Conversation[]) => {
                this.conversations = Conversation.initializeConversations(jsonConversations);
                resolve(true);
              },
              error: (error: HttpErrorResponse) => {
                console.log(error);
                resolve(false);
              }
            });
          } else if(this.isProfessorCategory()) {
            this.conversationService.getConversationsByProfessorId(this.currentUserService.user?.getUserId()!).subscribe({
              next: (jsonConversations: Conversation[]) => {
                this.conversations = Conversation.initializeConversations(jsonConversations);
                resolve(true);
              },
              error: (error: HttpErrorResponse) => {
                console.log(error);
                resolve(false);
              }
            });
          } else if(this.isAdminCategory()) {
            this.conversationService.getAllEntities().subscribe({
              next: (jsonConversations: Conversation[]) => {
                this.conversations = Conversation.initializeConversations(jsonConversations);
                resolve(true);
              },
              error: (error: HttpErrorResponse) => {
                console.log(error);
                resolve(false);
              }
            });
          }
        }).then((success: boolean) => {
          if(success) {
            for (let conversation of this.conversations) {
              this.conversationElements.push(new ConversationElement(conversation));
            }
          }
        });
      })
    })

    this.el.nativeElement.style.width = `100%`;
  }

  onConversationElementClick(conversationElement: ConversationElement) {
    for (let conversationElement of this.conversationElements) {
      conversationElement.setUnclicked();
    }

    conversationElement.setClicked();
    this.selectedConversationElement = conversationElement;

    this.messageListElements = [];
    if(conversationElement.conversation?.messages != undefined) {
      this.messageService.getMessagesByConversationId(conversationElement.conversation?.conversationId!).subscribe({
        next: (jsonMessages: Message[]) => {
          conversationElement.conversation?.setMessages(Message.initializeMessages(jsonMessages));
          for (let message of conversationElement.conversation?.messages!) {
            this.messageListElements.push(new MessageListElement(message, this.currentUserService.user!, this.getCurrentUserCategory()));
          }
          this.scrollToBottom();
        },
        error: (error) => console.log(error)
      });
    }
  }

  onMessageEnter() {
    if (this.messageTyped.length > 0) {
      let message = new Message(
        this.messageTyped,
        getCurrentTimeStamp(),
        this.getUserSenderId(professorCategory),
        this.getUserSenderId(studentCategory),
        this.getUserSenderId(adminCategory),
        this.selectedConversationElement?.conversation?.conversationId!);

      this.messageService.addEntity(message).subscribe({
        next: (jsonMessage: Message) => {
          this.updateMessageLists(Message.fromJson(jsonMessage));

          this.messageTyped = "";
        },
        error: (error) => {
          console.log(error);
        }

      })
    }
  }

  private getUserSenderId(userCategory: UserCategory) {
    if(userCategory.name == this.getCurrentUserCategory().name) {
      return this.currentUserService.user?.getUserId()!;
    } else {
      return 0;
    }
  }

  private updateMessageLists(message: Message) {
    this.selectedConversationElement?.conversation?.messages?.push(message);
    let messageListElement = new MessageListElement(message, this.currentUserService.user!, this.getCurrentUserCategory());
    messageListElement.owner = this.currentUserService.user!;
    this.messageListElements.push(messageListElement);

    this.scrollToBottom();
  }

  private scrollToBottom() {
    setTimeout(() => {
      let messageAreaDivEl = this.messageAreaDiv.nativeElement;
      messageAreaDivEl.scrollTop = Math.max(0, messageAreaDivEl.scrollHeight - messageAreaDivEl.offsetHeight);
    }, 5);
  }

  onSubmitUser(keyboardEvent: KeyboardEvent) {
    if (keyboardEvent.key === 'Enter') {
      this.foundUsers = [];
      if(this.selectedUser != undefined) {
        if(this.isProfessorCategory()) {
          this.studentService.getUsersByName(this.selectedUser?.toString()).subscribe({
            next: (jsonUsers: User[]) => {
              for (let user of User.initializeUsers(jsonUsers)) {
                this.foundUsers.push(user);
              }
              console.log(this.foundUsers)
            },
            error: (error: HttpErrorResponse) => {
              console.log(error);
            }
          });
        } else if(this.isStudentCategory()) {
          this.professorService.getUsersByName(this.selectedUser?.toString()).subscribe({
            next: (jsonUsers: User[]) => {
              for (let user of User.initializeUsers(jsonUsers)) {
                this.foundUsers.push(user);
              }
            },
            error: (error: HttpErrorResponse) => {
              console.log(error);
            }
          });
        }
      }
    }
  }

  onUserSelected() {
    if(this.selectedUser != undefined && this.selectedUser instanceof User) {
      let user = this.selectedUser as User;
      let conversation = this.conversations.find(conversation => {
        if(this.isStudentCategory()) {
          return conversation.studentId == this.currentUserService.user?.getUserId() && conversation.professorId == user.getUserId();
        } else if(this.isProfessorCategory()) {
          return conversation.professorId == this.currentUserService.user?.getUserId() && conversation.studentId == user.getUserId();
        } else {
          return false;
        }
      });

      if(conversation == undefined) {
        if(this.isStudentCategory()) {
          conversation = new Conversation(user.getUserId(), this.currentUserService.user?.getUserId()!);
        } else if(this.isProfessorCategory()) {
          conversation = new Conversation(this.currentUserService.user?.getUserId()!, user.getUserId());
        }
        this.conversationService.addEntity(conversation!).subscribe({
          next: (jsonConversation: Conversation) => {
            this.conversationService.findEntityById(jsonConversation.conversationId!).subscribe({
              next: (jsonConversation: Conversation) => {
                this.conversations.push(Conversation.fromJson(jsonConversation));
                let conversationElement = new ConversationElement(Conversation.fromJson(jsonConversation));
                this.conversationElements.push(conversationElement);
                this.onConversationElementClick(conversationElement);
              },
              error: (error: HttpErrorResponse) => {
                console.log(error);
              }
            });
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
          }
        });
      } else {
        let conversationElement = this.conversationElements.find(conversationElement =>
          conversationElement.conversation?.conversationId == conversation?.conversationId);
        if(conversationElement != undefined) {
          this.onConversationElementClick(conversationElement);
        } else {
          console.log("Error: conversationElement is undefined");
        }
      }
    }
  }
}
