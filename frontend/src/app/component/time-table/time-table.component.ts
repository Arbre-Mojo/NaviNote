import {Component, OnInit} from '@angular/core';
import {CookieComponent} from "../misc/cookie-component";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {StudentService} from "../../../service/user/student.service";
import {CookieService} from "ngx-cookie-service";
import {studentCategory} from "../../../service/user/userCategories";
import {TimeTableService} from "../../../service/time-table.service";
import {AdminService} from "../../../service/user/admin.service";
import {ProfessorService} from "../../../service/user/professor.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-time-table',
  standalone: true,
  imports: [],
  templateUrl: './time-table.component.html',
  styleUrl: './time-table.component.scss'
})
export class TimeTableComponent extends CookieComponent implements OnInit {

  constructor(protected override currentUserService: CurrentUserService,
              protected override timeTableService: TimeTableService,
              protected override studentService: StudentService,
              protected override adminService: AdminService,
              protected override professorService: ProfessorService,
              protected override cookieService: CookieService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then(() => {
      this.specificUserPage(studentCategory).then()
    });
  }

}
