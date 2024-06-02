import {Component, ElementRef, OnInit} from '@angular/core';
import {faPlus, faUserGroup} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CookieComponent} from "../../misc/cookie-component";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {UserElementComponent} from "./user-element/user-element.component";
import {
  ConnectionSecurityModalComponent
} from "../connection-security/connection-security-modal/connection-security-modal.component";
import {UploadPfpModalComponent} from "../upload-pfp-modal/upload-pfp-modal.component";
import {EditingUserType} from "../../misc/editing-user-type";
import {FormsModule} from "@angular/forms";
import {Subject} from "rxjs";
import {emailElement, firstNameElement, lastNameElement,} from "../../misc/editable-element";
import {User} from "../../../../model/user/user";
import {ManageUsersService} from "../../../../service/misc/manage-users.service";
import {AdminService} from "../../../../service/user/admin.service";
import {CurrentUserService} from "../../../../service/user/current-user.service";
import {StudentService} from "../../../../service/user/student.service";
import {ProfessorService} from "../../../../service/user/professor.service";
import {adminCategory, professorCategory, studentCategory} from "../../../../service/user/userCategories";
import {Admin} from "../../../../model/user/admin";
import {Student} from "../../../../model/user/student";
import {Professor} from "../../../../model/user/professor";
import {RegisterModalComponent} from "../../authentication/register/register-modal/register-modal.component";

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf,
    UserElementComponent,
    ConnectionSecurityModalComponent,
    UploadPfpModalComponent,
    NgIf,
    FormsModule,
    RegisterModalComponent
  ],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent extends CookieComponent implements OnInit {

  faUserGroup = faUserGroup;

  faPlus = faPlus;
  isConnectionSecurityModalOpen: boolean = false;
  isUploadPfpImgModalOpen: boolean = false;

  isRegisterUserModalOpen: boolean = false;
  editingUserSubject: Subject<User> = new Subject<User>();
  editingUser!: User;

  editingUserType: EditingUserType = EditingUserType.ADMIN;

  constructor(private el: ElementRef,
              protected override manageUsersService: ManageUsersService,
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

    if (this.manageUsersService.editingUserCategory === undefined) {
      this.routeTo('/user-account/user-settings');
    } else {
      this.initializeUserByToken().then(() => {
        this.specificUserPage(adminCategory).then();
        this.manageUsersService.fieldFilter = firstNameElement.name;
        this.getSearchedUsers();
      });
    }
  }

  onConnectionSecurityModal(newVal: boolean) {
    this.isConnectionSecurityModalOpen = newVal;
  }

  onUploadPfpImgModal(newVal: boolean) {
    this.isUploadPfpImgModalOpen = newVal;
  }

  onRegisterUserModal(newVal: boolean) {
    this.isRegisterUserModalOpen = newVal;
  }

  onEditUser(user: User) {
    this.editingUser = user;
    this.editingUserSubject.next(user);
    this.onConnectionSecurityModal(true);
  }


  onEditUserImgPfp(user: User) {
    this.editingUser = user;
    this.editingUserSubject.next(user);
    this.onUploadPfpImgModal(true);
  }

  onDeleteUser(user: User) {
    this.manageUsersService.editingUserService?.deleteUserAndPfpImg(user).then(success => {
      if (success) {
        if (this.manageUsersService.editingUserCategory === adminCategory) {
          this.currentUserService.user?.admins?.splice(this.currentUserService.user?.admins?.indexOf(user as Admin), 1);
        } else if (this.manageUsersService.editingUserCategory === studentCategory) {
          this.currentUserService.user?.students?.splice(this.currentUserService.user?.students?.indexOf(user as Student), 1);
        } else if (this.manageUsersService.editingUserCategory === professorCategory) {
          this.currentUserService.user?.professors?.splice(this.currentUserService.user?.professors?.indexOf(user as Professor), 1);
        }
      }
    });
  }

  getSearchedUsers() {
    if (this.manageUsersService.editingUserCategory === adminCategory) {
      return this.currentUserService.user?.admins?.filter(user => {
        return this.checkFilter(user);
      }).map(user => user as User);
    } else if (this.manageUsersService.editingUserCategory === studentCategory) {
      return this.currentUserService.user?.students?.filter(user => {
        return this.checkFilter(user);
      }).map(user => user as User);
    } else if (this.manageUsersService.editingUserCategory === professorCategory) {
      return this.currentUserService.user?.professors?.filter(user => {
        return this.checkFilter(user);
      }).map(user => user as User);
    }
    return [];
  }

  checkFilter(user: User) {
    if (this.manageUsersService.fieldFilter === emailElement.name) {
      return user.email.toLowerCase().includes(this.manageUsersService.searchInput.toLowerCase())
    } else if (this.manageUsersService.fieldFilter === firstNameElement.name) {
      return user.firstName?.toLowerCase().includes(this.manageUsersService.searchInput.toLowerCase())
    } else if (this.manageUsersService.fieldFilter === lastNameElement.name) {
      return user.lastName?.toLowerCase().includes(this.manageUsersService.searchInput.toLowerCase())
    }
    return false;
  }

  clearFilters() {
    this.manageUsersService.fieldFilter = firstNameElement.name;
    this.manageUsersService.searchInput = "";
  }

  onUserAdded(user: User) {
    if (this.manageUsersService.editingUserCategory === adminCategory) {
      this.currentUserService.user?.admins?.push(user as Admin);
    } else if (this.manageUsersService.editingUserCategory === studentCategory) {
      this.currentUserService.user?.students?.push(user as Student);
    } else if (this.manageUsersService.editingUserCategory === professorCategory) {
      this.currentUserService.user?.professors?.push(user as Professor);
    }
  }
}
