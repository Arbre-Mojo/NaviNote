import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {RECAPTCHA_SETTINGS, RecaptchaModule} from "ng-recaptcha";
import {FormsModule} from "@angular/forms";
import {environment} from "../../../../environment/environment.prod";
import {AuthenticationComponent} from "../authentication-component";
import bcrypt from "bcryptjs";
import {LogoComponent} from "../../logo/logo.component";
import {CookieService} from "ngx-cookie-service";
import {FooterComponent} from "../../footer/footer.component";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {CurrentUserService} from "../../../../service/user/current-user.service";
import {EmailService} from "../../../../service/misc/email.service";
import {AdminService} from "../../../../service/user/admin.service";
import {StudentService} from "../../../../service/user/student.service";
import {ProfessorService} from "../../../../service/user/professor.service";
import {User} from "../../../../model/user/user";
import {studentCategory} from "../../../../service/user/userCategories";

// @ts-ignore
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf, HttpClientModule,
    FormsModule,
    RecaptchaModule, NgIf, LogoComponent, FooterComponent, NgxResizeObserverModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS, useValue: {
        siteKey: environment.siteKey
      }
    }
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth.styles.scss', '../../main/main.component.css']
})
export class LoginComponent extends AuthenticationComponent implements OnInit {
  // Form fields
  emailInput: string = "";
  passwordInput: string = "";

  // Logic Fields
  isLoginValid: boolean = false;
  isLoginChecked: boolean = false;

  constructor(protected override studentService: StudentService,
              protected override professorService: ProfessorService,
              protected override adminService: AdminService,
              protected override cookieService: CookieService,
              protected override emailService: EmailService,
              protected override currentUserService: CurrentUserService,
              protected override router: Router, override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    if (this.hasUserToken()) {
      this.deleteUserToken();
    }
  }

  override onSubmit() {
    new Promise<boolean>((resolve, reject) => {
      if (this.isFormValid()) {
        this.fetchUserService().findUserByEmail(this.emailInput).subscribe({
          next: (jsonUser: User) => {
            if (jsonUser != null) {
              bcrypt.compare(this.passwordInput, jsonUser.password).then(success => {
                if (success) {
                  this.resetTokenByEmail(jsonUser.email).then((success) => {
                    resolve(success);
                    if (success) {
                      this.initializeUser(jsonUser);
                    }
                  });
                  this.isLoginValid = true;
                  console.log('Login is valid');
                } else {
                  console.log('Login is invalid');
                  resolve(false);
                }
                this.isLoginChecked = true;
              });
            } else {
              console.log('Json User is null');
              this.isLoginChecked = true;
              resolve(false);
            }
          },
          error: (error: HttpErrorResponse) => {
            console.log('Login is invalid, HTTP ERROR');
            resolve(false);
          }
        });
      } else {
        console.log('Form is invalid');
        resolve(false);
      }
    }).then(success => {
      super.onSubmit();

      if (success && this.isLoginValid) {
        this.routeToSite().then();
      }
    });
  }

  override isFormValid(): boolean {
    return this.isEmailValid() &&
      this.isPasswordValid() &&
      this.isCaptchaValid();
  }

  isEmailInvalid(): boolean {
    return !this.isEmailValid() && this.isSubmitted;
  }

  isEmailValid(): boolean {
    return this.isEmailProper(this.emailInput) && this.emailInput.length > 0;
  }

  isPasswordInvalid(): boolean {
    return !this.isPasswordValid() && this.isSubmitted;
  }

  isPasswordValid(): boolean {
    return this.passwordInput.length > 0;
  }

  isLoginInvalid(): boolean {
    return !this.isLoginValid && this.isLoginChecked && this.isSubmitted;
  }

  switchUserCategory() {
    if (!this.isStudentCategory()) {
      this.setCurrentUserCategory(studentCategory);
    } else {
      this.router.navigate(['/partner-selection'], {relativeTo: this.route}).then();
    }
  }
}
