import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {RECAPTCHA_SETTINGS, RecaptchaModule} from "ng-recaptcha";
import {environment} from "../../../../environment/environment.prod";
import {FormsModule} from "@angular/forms";
import {LogoComponent} from "../../logo/logo.component";
import {FooterComponent} from "../../footer/footer.component";
import {RegisterElementComponent} from "./register-element/register-element.component";
import {RegistrationType, registrationTypes} from "./registration-type";
import {CookieComponent} from "../../misc/cookie-component";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageKeys} from "../../misc/storage-keys";
import {EditingUserType} from "../../misc/editing-user-type";
import {UserService} from "../../../../service/user/user.service";
import {CurrentUserService} from "../../../../service/user/current-user.service";
import {StudentService} from "../../../../service/user/student.service";
import {AdminService} from "../../../../service/user/admin.service";
import {ProfessorService} from "../../../../service/user/professor.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgIf,
    RecaptchaModule,
    FormsModule,
    LogoComponent,
    FooterComponent,
    RegisterElementComponent
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../auth.styles.scss', '../../main/main.component.css']
})
export class RegisterComponent extends CookieComponent implements OnInit {
  registrationType!: RegistrationType;
  userService!: UserService<any>;
  constructor(protected override currentUserService: CurrentUserService,
              protected override studentService: StudentService,
              protected override adminService: AdminService,
              protected override professorService: ProfessorService,
              protected override cookieService: CookieService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    let customerCategoryName = "";
    this.route.params.subscribe(params => {
      customerCategoryName = params[StorageKeys.USER_CATEGORY];
    });

    for (let registrationType of registrationTypes) {
      if (registrationType.userCategory.getFormattedName() === customerCategoryName) {
        this.registrationType = registrationType;
        break;
      }
    }

    if(this.registrationType == undefined || this.registrationType.editingUserType === EditingUserType.ADMIN) {
      this.routeToSite().then();
    }

    this.userService = this.fetchUserService();
  }
}
