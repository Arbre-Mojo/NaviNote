import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CookieComponent} from "../../misc/cookie-component";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem, profileMenuItems} from "./menu-item";
import {NgIf} from "@angular/common";
import {CookieService} from "ngx-cookie-service";
import {CurrentUserService} from "../../../../service/user/current-user.service";
import {AdminService} from "../../../../service/user/admin.service";
import {ManageUsersService} from "../../../../service/misc/manage-users.service";
import {StudentService} from "../../../../service/user/student.service";
import {ProfessorService} from "../../../../service/user/professor.service";

@Component({
  selector: 'app-profile-menu-item',
  standalone: true,
  imports: [
    FaIconComponent,
    NgIf
  ],
  templateUrl: './profile-menu-item.component.html',
  styleUrl: './profile-menu-item.component.scss'
})
export class ProfileMenuItemComponent extends CookieComponent implements OnInit {
  @Input() profileMenuItem!: MenuItem;
  @Output() clickedOnEmitter = new EventEmitter<MenuItem>();

  borderRadius: string = '0';
  isShown: boolean = false;
  hasBorderBottom: boolean = true;

  constructor(protected override manageUsersService: ManageUsersService,
              protected override currentUserService: CurrentUserService,
              protected override studentService: StudentService,
              protected override professorService: ProfessorService,
              protected override adminService: AdminService,
              protected override cookieService: CookieService,
              protected override router: Router,
              protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    if (profileMenuItems.indexOf(this.profileMenuItem) == 0) {
      this.borderRadius = '10px 10px 0 0';
    } else if (profileMenuItems.indexOf(this.profileMenuItem) == profileMenuItems.length - 1) {
      this.borderRadius = '0 0 10px 10px';
      this.hasBorderBottom = false;
    }

    this.isShown = this.profileMenuItem.allowedUserCategories.includes(this.getCurrentUserCategory());
  }
}
