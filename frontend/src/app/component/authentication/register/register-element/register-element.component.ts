import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {LogoComponent} from "../../../logo/logo.component";
import {NgIf} from "@angular/common";
import {RegistrationType} from "../registration-type";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import bcrypt from "bcryptjs";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthenticationComponent} from "../../authentication-component";
import {RECAPTCHA_SETTINGS, RecaptchaModule} from "ng-recaptcha";
import {environment} from "../../../../../environment/environment.prod";
import {EditingUserType} from "../../../misc/editing-user-type";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {emailElement, firstNameElement, lastNameElement,} from "../../../misc/editable-element";
import {UserService} from "../../../../../service/user/user.service";
import {User} from "../../../../../model/user/user";
import {CurrentUserService} from "../../../../../service/user/current-user.service";
import {AdminService} from "../../../../../service/user/admin.service";
import {StudentService} from "../../../../../service/user/student.service";
import {ProfessorService} from "../../../../../service/user/professor.service";
import {EmailService} from "../../../../../service/misc/email.service";
import {adminCategory, professorCategory, studentCategory} from "../../../../../service/user/userCategories";
import {Admin} from "../../../../../model/user/admin";
import {Professor} from "../../../../../model/user/professor";
import {Student} from "../../../../../model/user/student";

@Component({
  selector: 'app-register-element',
  standalone: true,
  imports: [
    FormsModule,
    LogoComponent,
    NgIf,
    RecaptchaModule,
    FaIconComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS, useValue: {
        siteKey: environment.siteKey
      }
    }
  ],
  templateUrl: './register-element.component.html',
  styleUrl: './register-element.component.scss'
})
export class RegisterElementComponent extends AuthenticationComponent implements OnInit {
  // Elements
  firstNameElement = firstNameElement;
  lastNameElement = lastNameElement;
  emailElement = emailElement;

  faXmark = faXmark;

  // Form fields
  firstNameInput: string = "";
  lastNameInput: string = "";
  emailInput: string = "";
  passwordInput: string = "";
  confirmPasswordInput: string = "";

  // Logic Fields
  isEmailExists: boolean = false;
  isUserAdded: boolean = false;

  @Input() registrationType!: RegistrationType | undefined;
  @Input() userService!: UserService<any> | undefined;

  @Input() isModal: boolean = false
  @Output() onCloseModalEmitter = new EventEmitter<boolean>();
  @Output() onUserAddedEmitter = new EventEmitter<User>();

  constructor(protected override studentService: StudentService,
              protected override professorService: ProfessorService,
              protected override adminService: AdminService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              protected override emailService: EmailService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then();
  }

  override onSubmit() {
    new Promise<boolean>((resolve, reject) => {
      if (this.isFormValid()) {
        console.log("Form is valid")
        this.getUserByEmail(this.emailInput, this.userService!).then((user) => {
          this.isEmailExists = (user !== null) && (user !== undefined);
          // Generating hash from password with bcrypt (one of the packages that is used for hashing passwords)
          if (!this.isEmailExists) {
            bcrypt.hash(this.passwordInput, this.hashSalt, (err, hashPassword) => {
              let newUser: User | undefined = this.createNewUser(hashPassword);
              if (newUser == null) {
                console.log("Error, user is null");
                resolve(false);
              } else {
                if (this.isAdminRegistration()) {
                  this.userService?.addEntity(newUser).subscribe({
                    next: (newUser: User) => {
                      if (newUser != null) {
                        console.log("User added: ", newUser);
                        this.isUserAdded = true;
                        this.clearValues();
                        this.onUserAddedEmitter.emit(User.fromJson(newUser));
                        resolve(true);
                      } else {
                        console.log("Error, user is null");
                        this.isUserAdded = false;
                        resolve(false);
                      }
                    },
                    error: (error: HttpErrorResponse) => {
                      console.log("Error in adding new user: ", error);
                      this.isUserAdded = false;
                      resolve(false);
                    }
                  });
                } else {
                  resolve(false);
                }
              }
            });
          } else {
            console.log("Email already exists")
            resolve(false)
          }
        });
      } else {
        console.log("Form is invalid")
        resolve(false)
      }
    }).then(success => {
      if (!success) super.onSubmit();
    });
  }

  override isFormValid(): boolean {
    return this.isCaptchaValid() &&
      this.isFirstNameValid() &&
      this.isLastNameValid() &&
      this.isEmailProper(this.emailInput) &&
      this.isPasswordsMatch() &&
      this.isPasswordProper(this.passwordInput);
  }

  isFirstNameInvalid(): boolean {
    return !this.isFirstNameValid() && this.isSubmitted;
  }

  isFirstNameValid(): boolean {
    return this.firstNameInput.length > 0 ||
      !this.isEditableElementRelevant(firstNameElement, this.registrationType?.userCategory!);
  }

  isLastNameInvalid(): boolean {
    return !this.isLastNameValid() && this.isSubmitted;
  }

  isLastNameValid(): boolean {
    return this.lastNameInput.length > 0 ||
      !this.isEditableElementRelevant(lastNameElement, this.registrationType?.userCategory!);
  }

  isEmailInvalid(): boolean {
    return !this.isEmailProper(this.emailInput) && this.isSubmitted;
  }

  isPasswordInvalid(): boolean {
    return !(this.isPasswordProper(this.passwordInput)) && this.isSubmitted;
  }

  isPasswordsNotMatch(): boolean {
    return !this.isPasswordsMatch() && this.isSubmitted;
  }

  isPasswordsMatch(): boolean {
    return this.passwordInput === this.confirmPasswordInput;
  }

  isAdminRegistration(): boolean {
    return this.registrationType?.editingUserType === EditingUserType.ADMIN;
  }

  isUserRegistration(): boolean {
    return this.registrationType?.editingUserType === EditingUserType.USER;
  }

  isUserNotAdded(): boolean {
    return !this.isUserAdded && this.isSubmitted;
  }

  private createNewUser(hashPassword: string): User | undefined {
    // if (this.isStudentCategory()) {
    //   return new Student(this.firstNameInput, this.lastNameInput, this.emailInput, hashPassword);
    // } else if (this.isProfessorCategory()) {
    //   return new Professor(this.firstNameInput, this.lastNameInput, this.emailInput, hashPassword);
    // } else if (this.isAdminCategory()) {
    //   return new Admin(this.firstNameInput, this.lastNameInput, this.emailInput, hashPassword)
    // }
    // return undefined;

    return new User(this.firstNameInput, this.lastNameInput, this.emailInput, hashPassword)
  }

  override isProfessorCategory() {
    return this.registrationType?.userCategory.name === professorCategory.name;
  }

  override isAdminCategory() {
    return this.registrationType?.userCategory.name === adminCategory.name;
  }

  override isStudentCategory() {
    return this.registrationType?.userCategory.name === studentCategory.name;
  }

  override isCaptchaValid(): boolean {
    return super.isCaptchaValid() || this.isAdminRegistration();
  }

  closeModal() {
    this.onCloseModalEmitter.emit(false);
  }

  private clearValues() {
    this.isSubmitted = false;
    this.isEmailExists = false;

    this.firstNameInput = "";
    this.lastNameInput = "";
    this.emailInput = "";
    this.passwordInput = "";
    this.confirmPasswordInput = "";
  }
}
