import {Component, ElementRef, OnInit} from '@angular/core';
import {faCamera, faPenToSquare, faUser} from "@fortawesome/free-solid-svg-icons";
import {UploadPfpModalComponent} from "../upload-pfp-modal/upload-pfp-modal.component";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieComponent} from "../../misc/cookie-component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgIf} from "@angular/common";
import {User} from "../../../../model/user/user";
import {UserService} from "../../../../service/user/user.service";
import {AdminService} from "../../../../service/user/admin.service";
import {CurrentUserService} from "../../../../service/user/current-user.service";
import {StudentService} from "../../../../service/user/student.service";
import {ProfessorService} from "../../../../service/user/professor.service";

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [
    UploadPfpModalComponent,
    FaIconComponent,
    NgIf
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss'
})
export class UserSettingsComponent extends CookieComponent implements OnInit {

  isModalOpen: boolean = false;

  user!: User;
  userService!: UserService<any>

  faUser = faUser;
  faCamera = faCamera;
  faPenToSquare = faPenToSquare;

  constructor(private el: ElementRef,
              protected override studentService: StudentService,
              protected override professorService: ProfessorService,
              protected override adminService: AdminService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.el.nativeElement.style.width = `100%`;

    this.initializeUserByToken().then(() => {
      this.loggedInPage();

      this.user = this.currentUserService.user!;

      this.userService = this.fetchUserService();
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(newVal: boolean) {
    this.isModalOpen = newVal;
  }
}
