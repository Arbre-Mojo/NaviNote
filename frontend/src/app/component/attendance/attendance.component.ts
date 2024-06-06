import {Component, OnInit} from '@angular/core';
import {attendanceNavigationItem} from "../navigation-menu/navigation-item";
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
import {StudentListService} from "../../../service/student-list.service";
import {StudentList} from "../../../model/student-list";
import {AttendanceService} from "../../../service/misc/attendance.service";
import {Observable} from "rxjs";

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
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent extends CookieComponent implements OnInit {

  attendanceNavigationItem = attendanceNavigationItem;
  timeStart!: string | undefined;
  timeEnd!: string | undefined;

  selectedTimetable: TimeTable | string | undefined;
  foundTimetables: TimeTable[] = [];

  studentLists: StudentList[] = [];
  attendanceRegistered: boolean = false;

  constructor(private attendanceService: AttendanceService,
              protected override currentUserService: CurrentUserService,
              protected override studentService: StudentService,
              protected override adminService: AdminService,
              protected override professorService: ProfessorService,
              protected override cookieService: CookieService,
              protected override timeTableService: TimeTableService,
              protected override studentListService: StudentListService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then(() => {
      this.specificUserPage(professorCategory, adminCategory).then();
      if(this.attendanceService.timeTable != undefined) {
        this.selectedTimetable = this.attendanceService.timeTable;
        this.setTimetable(this.attendanceService.timeTable.timeTableId!);
      }
    });
  }

  onTimeTableSelected() {
    if (this.selectedTimetable !== undefined && typeof this.selectedTimetable !== 'string') {
      this.setTimetable(this.selectedTimetable.timeTableId!);
    }
  }

  setTimetable(timeTableId: number) {
    this.studentListService.getStudentListsByTimeTableId(timeTableId).subscribe({
      next: (jsonStudentLists: StudentList[]) => {
        this.studentLists = StudentList.initializeStudentLists(jsonStudentLists);
        console.log(this.studentLists)
      },
      error: (error: any) => console.error(error)
    });
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
    this.timeStart = undefined;
    this.timeEnd = undefined;
    this.selectedTimetable = undefined;
    this.foundTimetables = [];
    this.studentLists = [];
    this.attendanceRegistered = false;
  }

  onFinishAttendance() {
    let count = 0;
    new Observable<number>((observer) => {
      for (let studentList of this.studentLists) {
        this.studentListService.updateEntity(studentList).subscribe({
          next: (jsonStudentList: StudentList) => {
            observer.next(++count);
          },
          error: (error: any) => console.error(error)
        });
      }
    }).subscribe({
      next: (count: number) => {
        if(count == this.studentLists.length) {
          console.log("All student lists updated");
          this.attendanceRegistered = true;
        }
      }
    });
  }

  resetAttendanceRegistered() {
    this.attendanceRegistered = false;
  }
}
