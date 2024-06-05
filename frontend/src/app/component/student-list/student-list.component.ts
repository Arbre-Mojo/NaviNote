import {Component, OnInit} from '@angular/core';
import {studentListNavigationItem} from "../navigation-menu/navigation-item";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ConversationElementComponent} from "../messages/conversation-element/conversation-element.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageListElementComponent} from "../messages/message-list-element/message-list-element.component";
import {NgForOf, NgIf} from "@angular/common";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {StudentService} from "../../../service/user/student.service";
import {AdminService} from "../../../service/user/admin.service";
import {ProfessorService} from "../../../service/user/professor.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieComponent} from "../misc/cookie-component";
import {adminCategory, professorCategory} from "../../../service/user/userCategories";
import {TimeTable} from "../../../model/time-table";
import {TimeTableService} from "../../../service/time-table.service";
import {ByCourseBody} from "../../../model/query/select/by-course-name-and-interval";
import {getSqlTimeStamp} from "../misc/functions";

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    AutoCompleteModule,
    ConversationElementComponent,
    FaIconComponent,
    FormsModule,
    MessageListElementComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent extends CookieComponent implements OnInit {

  studentListNavigationItem = studentListNavigationItem;
  timeStart!: string | undefined;
  timeEnd!: string | undefined;

  selectedTimetable: TimeTable | string | undefined;
  foundTimetables: TimeTable[] = [];

  constructor(protected override currentUserService: CurrentUserService,
              protected override studentService: StudentService,
              protected override adminService: AdminService,
              protected override professorService: ProfessorService,
              protected override cookieService: CookieService,
              protected override timeTableService: TimeTableService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then(() => {
      this.specificUserPage(professorCategory, adminCategory).then();
    });
  }

  onTimeTableSelected() {
    if (this.selectedTimetable !== undefined && typeof this.selectedTimetable !== 'string') {

    }
  }

  onSubmitTimeTable(keyboardEvent: KeyboardEvent) {
    if (keyboardEvent.key === 'Enter') {
      let timeStart!: Date;
      let timeEnd!: Date;

      if (this.selectedTimetable !== undefined && typeof this.selectedTimetable == 'string') {
        if (this.timeStart != undefined) {
          timeStart = new Date(this.timeStart);
        } else {
          timeStart = new Date();
          timeStart.setFullYear(0)
          timeStart.setMonth(0)
          timeStart.setDate(1)
        }
        if (this.timeEnd != undefined) {
          timeEnd = new Date(this.timeEnd);
        } else {
          timeEnd = new Date();
        }

        console.log(timeStart)
        console.log(timeEnd)


        let byCourseBody = new ByCourseBody(this.selectedTimetable, getSqlTimeStamp(timeStart), getSqlTimeStamp(timeEnd));
        if (this.isProfessorCategory()) {
          byCourseBody.professorId = this.currentUserService.user?.getUserId();
        }
        console.log(byCourseBody)
        this.timeTableService.getTimeTablesByCourseNameAndInterval(byCourseBody).subscribe({
          next: (jsonTimeTables: TimeTable[]) => {
            this.foundTimetables = TimeTable.initializeTimeTables(jsonTimeTables);
            console.log(this.foundTimetables)
          },
          error: (error: any) => console.error(error)
        })
      }

    }
  }

  clearFilters() {

  }
}
