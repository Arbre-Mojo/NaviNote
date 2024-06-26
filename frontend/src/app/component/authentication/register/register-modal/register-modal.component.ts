import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  ConnectionSecurityElementComponent
} from "../../../user-account/connection-security/connection-security-element/connection-security-element.component";
import {NgIf} from "@angular/common";
import {RegisterElementComponent} from "../register-element/register-element.component";
import {ModalComponent} from "../../../misc/modal-component";
import {RegistrationType} from "../registration-type";
import {User} from "../../../../../model/user/user";
import {UserService} from "../../../../../service/user/user.service";

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [
    ConnectionSecurityElementComponent,
    NgIf,
    RegisterElementComponent
  ],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.scss'
})
export class RegisterModalComponent extends ModalComponent {
  @Input() override isModalOpen = false
  @Output() override onModalChangeEmitter = new EventEmitter<boolean>()
  @Output() onUserAddedEmitter = new EventEmitter<User>()

  @Input() registrationType!: RegistrationType;
  @Input() userService!: UserService<any>
  constructor() {
    super();
  }

  override isFormValid(): boolean {
    throw new Error('Method not implemented.');
  }

  onUserAdded(user: User) {
    this.onUserAddedEmitter.emit(user);
  }
}
