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
import {TimeTable} from "../../../model/time-table";
import {TimeTableService} from "../../../service/time-table.service";
import {getDateTime, getDateTimeDifference, getFormattedTime} from "../misc/functions";
import {AddJustificationModalComponent} from "../add-justification-modal/add-justification-modal.component";
import {Justification} from "../../../model/justification";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfessorService} from "../../../service/user/professor.service";
import {AdminService} from "../../../service/user/admin.service";
import {JustificationService} from "../../../service/justification.service";

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

  selectedTimeTables: TimeTable[] = [];
  selectedNavigationItem: NavigationItem = absencesNavigationItem;

  newJustification!: Justification;
  selectedTimeTable!: TimeTable;

  protected readonly getDateTime = getDateTime;
  protected readonly getDateTimeDifference = getDateTimeDifference;
  protected readonly getFormattedTime = getFormattedTime;

  protected readonly absencesNavigationItem = absencesNavigationItem;
  protected readonly tardinessNavigationItem = tardinessNavigationItem;

  isJustificationModalOpen: boolean = false;

  constructor(protected override currentUserService: CurrentUserService,
              protected override timeTableService: TimeTableService,
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
      this.timeTableService.getAbsencesByStudentId(this.currentUserService.user?.getUserId()!).subscribe({
        next: (absences: TimeTable[]) => {
          this.selectedTimeTables = TimeTable.initializeTimeTables(absences);
          this.getJustifications(this.selectedTimeTables).then();
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else if (navigationItem === tardinessNavigationItem) {
      this.timeTableService.getDelaysByStudentId(this.currentUserService.user?.getUserId()!).subscribe({
        next: (delays: TimeTable[]) => {
          this.selectedTimeTables = TimeTable.initializeTimeTables(delays);
          this.getJustifications(this.selectedTimeTables).then();
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

  onOpenModal(timeTable: TimeTable) {
    this.newJustification = new Justification("", timeTable.timeTableId!, this.currentUserService.user?.getUserId()!, false);
    this.selectedTimeTable = timeTable;
    this.isJustificationModalOpen = true;
  }

  onCloseModal() {
    this.isJustificationModalOpen = false;
  }

  hasJustification(timeTable: TimeTable) {
    return timeTable.justification != undefined
  }

  isJustificationAccepted(timeTable: TimeTable) {
    if(timeTable.justification != undefined) {
      return timeTable.justification?.accepted;
    } else {
      return false;
    }
  }

  getTotals() {
    let toJustifyTimeMins = 0;
    let justifiedTimeMins = 0;
    let unjustifiedTimeMins = 0;

    this.selectedTimeTables.forEach((timeTable: TimeTable) => {
      if(timeTable.justification == undefined) {
        if(timeTable.absent) {
          toJustifyTimeMins += (new Date(timeTable.timeEnd).getTime() - new Date(timeTable.timeStart).getTime()) / 60000;
        } else if(timeTable.minutesLate > 0) {
          toJustifyTimeMins += timeTable.minutesLate;
        }
      } else {
        if(timeTable.justification.accepted) {
          if(timeTable.absent) {
            justifiedTimeMins += (new Date(timeTable.timeEnd).getTime() - new Date(timeTable.timeStart).getTime()) / 60000;
          } else if(timeTable.minutesLate > 0) {
            justifiedTimeMins += timeTable.minutesLate;
          }
        } else {
          if(timeTable.absent) {
            unjustifiedTimeMins += (new Date(timeTable.timeEnd).getTime() - new Date(timeTable.timeStart).getTime()) / 60000;
          } else if(timeTable.minutesLate > 0) {
            unjustifiedTimeMins += timeTable.minutesLate;
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
