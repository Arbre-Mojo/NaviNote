import {Component, OnInit} from '@angular/core';
import {CookieComponent} from "../misc/cookie-component";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {StudentService} from "../../../service/user/student.service";
import {AdminService} from "../../../service/user/admin.service";
import {ProfessorService} from "../../../service/user/professor.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {adminCategory} from "../../../service/user/userCategories";
import {JustificationComponent} from "./justification/justification.component";
import {NgForOf, NgIf} from "@angular/common";
import {Justification} from "../../../model/justification";
import {JustificationService} from "../../../service/justification.service";
import {Student} from "../../../model/user/student";
import {JustificationImageService} from "../../../service/justification-image.service";

@Component({
  selector: 'app-manage-justifications',
  standalone: true,
  imports: [
    JustificationComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './manage-justifications.component.html',
  styleUrl: './manage-justifications.component.scss'
})
export class ManageJustificationsComponent extends CookieComponent implements OnInit {

  justifications: Justification[] = [];

  constructor(protected override currentUserService: CurrentUserService,
              protected override studentService: StudentService,
              protected override adminService: AdminService,
              protected override professorService: ProfessorService,
              protected override justificationService: JustificationService,
              protected override justificationImageService: JustificationImageService,
              protected override cookieService: CookieService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then(() => {
      this.specificUserPage(adminCategory).then();

      this.justificationService.getAllEntities().subscribe({
        next: (jsonJustifications: Justification[]) => {
          this.justifications = Justification.initializeJustifications(jsonJustifications);
          let students: Student[] = [];

          for (let justification of this.justifications) {
            if(justification.student != undefined) {
              students.push(justification.student);
            }
          }

          this.initializeUsersPfpImgUrl(students, this.studentService).then();
          this.initializeJustificationImages(this.justifications).then();
        },
        error: (error: any) => console.error(error)
      });
    })
  }

}
