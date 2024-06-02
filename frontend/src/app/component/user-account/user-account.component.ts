import {AfterViewChecked, ChangeDetectorRef, Component, ComponentRef, OnInit} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FooterComponent} from "../footer/footer.component";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {CookieComponent} from "../misc/cookie-component";
import {UploadPfpModalComponent} from "./upload-pfp-modal/upload-pfp-modal.component";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {ProfileMenuItemComponent} from "./profile-menu-item/profile-menu-item.component";
import {profileMenuItems} from "./profile-menu-item/menu-item";
import {UserSettingsComponent} from "./user-settings/user-settings.component";
import {StudentService} from "../../../service/user/student.service";
import {ProfessorService} from "../../../service/user/professor.service";
import {AdminService} from "../../../service/user/admin.service";
import {CurrentUserService} from "../../../service/user/current-user.service";

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [
    FaIconComponent,
    FooterComponent,
    NgxResizeObserverModule,
    UploadPfpModalComponent,
    NgIf,
    ProfileMenuItemComponent,
    NgForOf,
    RouterOutlet,
    UserSettingsComponent
  ],
  providers: [
    UploadPfpModalComponent,
  ],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.scss'
})
export class UserAccountComponent extends CookieComponent implements OnInit, AfterViewChecked {
  profileMenuItems = profileMenuItems;

  constructor(private cdr: ChangeDetectorRef,
              protected override studentService: StudentService,
              protected override professorService: ProfessorService,
              protected override adminService: AdminService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then(() => {
      this.loggedInPage();
    });
    if(this.router.url == '/user-account') {
      this.routeTo('/user-account/user-settings');
    }
  }

  ngAfterViewChecked(): void {
    profileMenuItems.forEach((profileMenuItem) => {
      if (profileMenuItem.link == this.router.url) {
        profileMenuItem.class = "profile-menu-item-clicked";
      } else {
        profileMenuItem.class = "profile-menu-item";
      }
    });
    this.cdr.detectChanges();
  }
}
