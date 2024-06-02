import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CookieComponent} from "../../../misc/cookie-component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCamera, faPen, faTrash, faUser} from "@fortawesome/free-solid-svg-icons";
import {NgIf} from "@angular/common";
import {User} from "../../../../../model/user/user";
import {AdminService} from "../../../../../service/user/admin.service";
import {CurrentUserService} from "../../../../../service/user/current-user.service";
import {StudentService} from "../../../../../service/user/student.service";
import {ProfessorService} from "../../../../../service/user/professor.service";

@Component({
  selector: 'app-user-element',
  standalone: true,
  imports: [
    FaIconComponent,
    NgIf
  ],
  templateUrl: './user-element.component.html',
  styleUrl: './user-element.component.scss'
})
export class UserElementComponent extends CookieComponent {
  faUser = faUser;
  faPen = faPen;
  faCamera = faCamera;
  faTrash = faTrash;

  @Input() user: User | undefined;
  @Output() onEditUserEmitter = new EventEmitter<User>();
  @Output() onDeleteUserEmitter = new EventEmitter<User>();
  @Output() onEditImgPfpEmitter = new EventEmitter<User>();

  constructor(protected override studentService: StudentService,
              protected override professorService: ProfessorService,
              protected override adminService: AdminService,
              protected override currentUserService: CurrentUserService) {
    super();
  }

  onEditUser() {
    this.onEditUserEmitter.emit(this.user);
  }

  onEditImgPfp() {
    this.onEditImgPfpEmitter.emit(this.user);
  }

  onDeleteUser() {
    console.log(this.user?.getUserId())
    this.onDeleteUserEmitter.emit(this.user);
  }
}
