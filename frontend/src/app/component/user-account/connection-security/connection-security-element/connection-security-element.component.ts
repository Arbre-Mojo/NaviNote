import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  editableElements,
  emailElement,
  firstNameElement,
  lastNameElement,
  passwordElement,
} from "../../../misc/editable-element";
import {ConnectionSecurityFieldComponent} from "../connection-security-field/connection-security-field.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormComponent} from "../../../misc/form-component";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {EditingUserType} from "../../../misc/editing-user-type";
import {Subject} from "rxjs";
import {User} from "../../../../../model/user/user";
import {UserService} from "../../../../../service/user/user.service";
import {UserCategory} from "../../../../../service/user/userCategories";

@Component({
  selector: 'app-connection-security-element',
  standalone: true,
  imports: [
    ConnectionSecurityFieldComponent,
    NgForOf,
    NgIf,
    FaIconComponent
  ],
  templateUrl: './connection-security-element.component.html',
  styleUrl: './connection-security-element.component.scss'
})
export class ConnectionSecurityElementComponent extends FormComponent implements OnInit {
  faXmark = faXmark;

  editableElements = editableElements;
  changesSuccess: boolean = false;

  @Input() user!: User;

  @Input() userSubject!: Subject<User>;
  @Input() userService!: UserService<any>
  @Input() userCategory!: UserCategory;

  @Input() editingUserType: EditingUserType = EditingUserType.USER;
  @Input() isModal: boolean = false
  @Output() onCloseModal = new EventEmitter<boolean>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.checkInfo(this.user);

    if(this.userSubject !== undefined) this.userSubject.subscribe({
      next: (user: User) => {
        this.checkInfo(user);
        this.user = user;
      }
    });
  }

  private checkInfo(user: User) {
    if (user != undefined && this.userService != undefined && this.userCategory != undefined) {
      this.setEditableElementValues();
    }
  }

  override isFormValid(): boolean {
    throw new Error('Method not implemented.');
  }

  setEditableElementValues() {
    this.editableElements.forEach((editableElement) => {
      if (this.isEditableElementRelevant(editableElement, this.userCategory)) {
        switch (editableElement.name) {
          case firstNameElement.name:
            editableElement.value = this.user?.firstName!;
            break;
          case lastNameElement.name:
            editableElement.value = this.user?.lastName!;
            break;
          case emailElement.name:
            editableElement.value = this.user?.email!;
            break;
          case passwordElement.name:
            editableElement.value = this.user?.password!;
            break;
        }
      }
    });
  }

  private setUserFields() {
    this.editableElements.forEach((editableElement) => {
      if (this.isEditableElementRelevant(editableElement, this.userCategory)) {
        switch (editableElement.name) {
          case firstNameElement.name:
            this.user.setFirstName(editableElement.value);
            break;
          case lastNameElement.name:
            this.user.setLastName(editableElement.value);
            break;
          case emailElement.name:
            this.user.setEmail(editableElement.value);
            break;
          case passwordElement.name:
            this.user.setPassword(editableElement.value);
            break;
        }
      }
    });
  }

  onApplyChanges() {
    this.setUserFields();
    let user: User = User.fromJson(this.user)

    this.userService.updateEntity(user).subscribe({
      next: (jsonUser: User) => {
        console.log("Updated user.")
        this.changesSuccess = true;
      },
      error: (error) => {
        this.changesSuccess = false;
        console.log("HTTP ERROR: Failed to update user.");
      },
      complete: () => {
        super.onSubmit();
      }
    });
  }

  onCancel() {
    this.setEditableElementValues();
    this.isSubmitted = false;
  }

  isNotSuccess() {
    return !this.changesSuccess && this.isSubmitted;
  }

  isSuccess() {
    return this.changesSuccess && this.isSubmitted;
  }

  closeModal() {
    this.onCloseModal.emit(false);
  }
}
