import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LogoComponent} from "../logo/logo.component";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {CookieComponent} from "../misc/cookie-component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faBars, faPlus, faXmark} from '@fortawesome/free-solid-svg-icons';
import 'resize-observer-polyfill/dist/ResizeObserver.global'
import {FormsModule} from "@angular/forms";
import {AutoCompleteModule} from 'primeng/autocomplete';
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {logout, MenuItem, profileMenuItems} from "../user-account/profile-menu-item/menu-item";
import {navigationItems} from "../navigation-menu/navigation-item";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {ManageUsersService} from "../../../service/misc/manage-users.service";
import {ProfessorService} from "../../../service/user/professor.service";
import {StudentService} from "../../../service/user/student.service";
import {AdminService} from "../../../service/user/admin.service";
import {NavigationMenuComponent} from "../navigation-menu/navigation-menu.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent,
    FontAwesomeModule, NgStyle,
    FormsModule, AutoCompleteModule,
    NgxResizeObserverModule, NgIf, NgForOf, NavigationMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    '[header-body]': 'true'
  }
})
export class HeaderComponent extends CookieComponent implements OnInit {
  // Logic Fields
  showMenu: boolean = false;

  dropDownMenuTop: number = 0;
  // Font Awesome Icons
  faBars = faBars;
  faXmark = faXmark;

  navigationItems = navigationItems;
  profileMenuItems = profileMenuItems;

  constructor(protected override manageUsersService: ManageUsersService,
              protected override adminService: AdminService,
              protected override studentService: StudentService,
              protected override professorService: ProfessorService,
              protected override currentUserService: CurrentUserService,
              protected override cookieService: CookieService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then();
  }

  override onProfileMenuItemClick(profileMenuItem: MenuItem) {
    super.onProfileMenuItemClick(profileMenuItem);

    this.showMenu = false;
  }

  burgerMenuOnClick() {
    this.showMenu = !this.showMenu;
  }

  xMarkOnClick() {
    this.showMenu = false;
  }

  handleResize(entry: ResizeObserverEntry) {
    this.dropDownMenuTop = entry.contentRect.height + 10;
  }
}
