import {Component, OnInit} from '@angular/core';
import {CookieComponent} from "../misc/cookie-component";
import {studentCategory} from "../../../service/user/userCategories";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {CookieService} from "ngx-cookie-service";
import {StudentService} from "../../../service/user/student.service";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ConversationElementComponent} from "../messages/conversation-element/conversation-element.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import {MessageListElementComponent} from "../messages/message-list-element/message-list-element.component";
import {NgForOf, NgIf} from "@angular/common";
import {NavigationMenuComponent} from "../navigation-menu/navigation-menu.component";
import {NavigationItem} from "../navigation-menu/navigation-item";
import {
  faCalculator,
  faClock,
  faPersonRunning,
} from "@fortawesome/free-solid-svg-icons";
import {getDateTime, getDateTimeDifference, getFormattedTime} from "../misc/functions";
import {AddJustificationModalComponent} from "../add-justification-modal/add-justification-modal.component";
import {Justification} from "../../../model/justification";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfessorService} from "../../../service/user/professor.service";
import {AdminService} from "../../../service/user/admin.service";
import {JustificationService} from "../../../service/justification.service";
import {StudentListService} from "../../../service/student-list.service";
import {StudentList} from "../../../model/student-list";

@Component({
  selector: 'app-absences-and-tardiness',
  standalone: true,
  imports: [
    AutoCompleteModule,
    ConversationElementComponent,
    FaIconComponent,
    FormsModule,
    MessageListElementComponent,
    NgForOf,
    NgIf,
    NavigationMenuComponent,
    AddJustificationModalComponent
  ],
  templateUrl: './absences-and-tardiness.component.html',
  styleUrl: './absences-and-tardiness.component.scss'
})
export class AbsencesAndTardinessComponent extends CookieComponent implements OnInit {

  navigationItems = navigationItems;
  faCalculator = faCalculator;

  selectedStudentLists: StudentList[] = [];
  selectedNavigationItem: NavigationItem = absencesNavigationItem;

  newJustification!: Justification;
  selectedStudentList!: StudentList;

  protected readonly getDateTime = getDateTime;
  protected readonly getDateTimeDifference = getDateTimeDifference;
  protected readonly getFormattedTime = getFormattedTime;

  protected readonly absencesNavigationItem = absencesNavigationItem;
  protected readonly tardinessNavigationItem = tardinessNavigationItem;

  isJustificationModalOpen: boolean = false;

  constructor(protected override currentUserService: CurrentUserService,
              protected override studentListService: StudentListService,
              protected override studentService: StudentService,
              protected override adminService: AdminService,
              protected override professorService: ProfessorService,
              protected override cookieService: CookieService,
              protected override justificationService: JustificationService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.initializeUserByToken().then(() => {
      this.specificUserPage(studentCategory).then();
      this.navigationItemOnClick(this.selectedNavigationItem)
    });
  }

  navigationItemOnClick(navigationItem: NavigationItem) {
    this.selectedNavigationItem = navigationItem;
    if(navigationItem === absencesNavigationItem) {
      this.studentListService.getAbsencesByStudentId(this.currentUserService.user?.getUserId()!).subscribe({
        next: (absences: StudentList[]) => {
          this.selectedStudentLists = StudentList.initializeStudentLists(absences);
          this.getJustifications(this.selectedStudentLists).then();
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else if (navigationItem === tardinessNavigationItem) {
      this.studentListService.getDelaysByStudentId(this.currentUserService.user?.getUserId()!).subscribe({
        next: (delays: StudentList[]) => {
          this.selectedStudentLists = StudentList.initializeStudentLists(delays);
          this.getJustifications(this.selectedStudentLists).then();
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  getTimeDiff(timeStart: string, timeEnd: string) {
    let diff = this.getDateTimeDifference(timeStart, timeEnd);
    return `${diff.hours} Hours ${diff.minutes} Minutes`;
  }

  getTime(minutesLate: number) {
    let time = this.getFormattedTime(minutesLate);
    let hours = '';
    if(time.hours > 0) {
      hours = `${time.hours} Hours `;
    }
    return `${hours}${time.minutes} Minutes`;
  }

  onOpenModal(studentList: StudentList) {
    this.newJustification = new Justification("", studentList.studentListId!, this.currentUserService.user?.getUserId()!, false);
    this.selectedStudentList = studentList;
    this.isJustificationModalOpen = true;
  }

  onCloseModal() {
    this.isJustificationModalOpen = false;
  }

  hasJustification(studentList: StudentList) {
    return studentList.justification != undefined
  }

  isJustificationAccepted(studentList: StudentList) {
    if(studentList.justification != undefined) {
      return studentList.justification?.accepted;
    } else {
      return false;
    }
  }

  getTotals() {
    let toJustifyTimeMins = 0;
    let justifiedTimeMins = 0;
    let unjustifiedTimeMins = 0;

    this.selectedStudentLists.forEach((studentList: StudentList) => {
      if(studentList.justification == undefined) {
        if(studentList.absent) {
          toJustifyTimeMins += (new Date(studentList.timeTable?.timeEnd!).getTime() - new Date(studentList.timeTable?.timeStart!).getTime()) / 60000;
        } else if(studentList.minutesLate > 0) {
          toJustifyTimeMins += studentList.minutesLate;
        }
      } else {
        if(studentList.justification.accepted) {
          if(studentList.absent) {
            justifiedTimeMins += (new Date(studentList.timeTable?.timeEnd!).getTime() - new Date(studentList.timeTable?.timeStart!).getTime()) / 60000;
          } else if(studentList.minutesLate > 0) {
            justifiedTimeMins += studentList.minutesLate;
          }
        } else {
          if(studentList.absent) {
            unjustifiedTimeMins += (new Date(studentList.timeTable?.timeEnd!).getTime() - new Date(studentList.timeTable?.timeStart!).getTime()) / 60000;
          } else if(studentList.minutesLate > 0) {
            unjustifiedTimeMins += studentList.minutesLate;
          }
        }
      }
    });
    let toJustifyTime = this.getFormattedTime(toJustifyTimeMins);
    let justifiedTime = this.getFormattedTime(justifiedTimeMins);
    let unjustifiedTime = this.getFormattedTime(unjustifiedTimeMins);

    return {toJustifyTime: `${toJustifyTime.hours} ${toJustifyTime.hours == 1 ? 'Hour' : 'Hours'} ${toJustifyTime.minutes} ${toJustifyTime.minutes == 1 ? 'Minute' : 'Minutes'}`,
            justifiedTime: `${justifiedTime.hours} ${justifiedTime.hours == 1 ? 'Hour' : 'Hours'} ${justifiedTime.minutes} ${justifiedTime.minutes == 1 ? 'Minute' : 'Minutes'}`,
            unjustifiedTime: `${unjustifiedTime.hours} ${unjustifiedTime.hours == 1 ? 'Hour' : 'Hours'} ${unjustifiedTime.minutes} ${unjustifiedTime.minutes == 1 ? 'Minute' : 'Minutes'}`};
  }
}

const absencesNavigationItem = new NavigationItem("Absences", "/absences", faClock);
const tardinessNavigationItem = new NavigationItem("Tardiness", "/tardiness", faPersonRunning);

const navigationItems: NavigationItem[] = [
  absencesNavigationItem,
  tardinessNavigationItem
];
