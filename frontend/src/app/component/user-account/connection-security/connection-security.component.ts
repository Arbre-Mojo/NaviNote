import {Component, ElementRef, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ConnectionSecurityFieldComponent} from "./connection-security-field/connection-security-field.component";
import {FooterComponent} from "../../footer/footer.component";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {ConnectionSecurityElementComponent} from "./connection-security-element/connection-security-element.component";
import {CookieComponent} from "../../misc/cookie-component";
import {User} from "../../../../model/user/user";
import {UserService} from "../../../../service/user/user.service";
import {UserCategory} from "../../../../service/user/userCategories";
import {AdminService} from "../../../../service/user/admin.service";
import {CurrentUserService} from "../../../../service/user/current-user.service";
import {StudentService} from "../../../../service/user/student.service";
import {ProfessorService} from "../../../../service/user/professor.service";

@Component({
  selector: 'app-connection-security',
  standalone: true,
  imports: [
    NgForOf,
    ConnectionSecurityFieldComponent,
    FooterComponent,
    NgIf,
    NgxResizeObserverModule,
    ConnectionSecurityElementComponent
  ],
  templateUrl: './connection-security.component.html',
  styleUrl: './connection-security.component.scss'
})
export class ConnectionSecurityComponent extends CookieComponent implements OnInit {

  user!: User | undefined;
  userService!: UserService<any>
  userCategory!: UserCategory;

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
    });

    this.userService = this.fetchUserService();
    this.userCategory = this.getCurrentUserCategory();
  }
}
