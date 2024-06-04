import {Component, OnInit} from '@angular/core';
import {CookieComponent} from "../misc/cookie-component";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {StudentService} from "../../../service/user/student.service";
import {CookieService} from "ngx-cookie-service";
import {TimeTableService} from "../../../service/time-table.service";
import {AdminService} from "../../../service/user/admin.service";
import {ProfessorService} from "../../../service/user/professor.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TimeTable} from "../../../model/time-table";
import {HttpErrorResponse} from "@angular/common/http";
import {createRange, getDateString, getDateTimeDifference, getGcd, getTimeString} from "../misc/functions";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {SubjectWrapperElementComponent} from "./subject-wrapper-element/subject-wrapper-element.component";

@Component({
  selector: 'app-time-table',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgStyle,
    NgxResizeObserverModule,
    SubjectWrapperElementComponent
  ],
  templateUrl: './time-table.component.html',
  styleUrl: './time-table.component.scss'
})
export class TimeTableComponent extends CookieComponent implements OnInit {
  protected readonly createRange = createRange;

  selectedDate = new Date();

  timeTables: TimeTable[] = [];
  grid: Day[] = [];
  timeStrings: string[] = [];

  totalWeeks = 52;

  startOfWeek = new Date();
  endOfWeek = new Date();
  selectedWeekNumber = this.getWeekNumber(new Date());

  cellHeight: number = 60;

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
      this.loggedInPage();

      if (this.isStudentCategory()) {
        this.timeTableService.getTimeTablesByStudentId(this.currentUserService.user?.getUserId()!).subscribe({
          next: (jsonTimeTables: TimeTable[]) => {
            this.timeTables = TimeTable.initializeTimeTables(jsonTimeTables);
            this.resetTimeTable();
          },
          error: (error: HttpErrorResponse) => console.log(error)
        });
      } else if (this.isProfessorCategory()) {
        this.timeTableService.getTimeTablesByProfessorId(this.currentUserService.user?.getUserId()!).subscribe({
          next: (jsonTimeTables: TimeTable[]) => {
            this.timeTables = TimeTable.initializeTimeTables(jsonTimeTables);
            this.resetTimeTable();
          },
          error: (error: HttpErrorResponse) => console.log(error)
        });
      } else if (this.isAdminCategory()) {
        this.timeTableService.getAllEntities().subscribe({
          next: (jsonTimeTables: TimeTable[]) => {
            this.timeTables = TimeTable.initializeTimeTables(jsonTimeTables);
            this.resetTimeTable();
          },
          error: (error: HttpErrorResponse) => console.log(error)
        });
      }
    })
  }

  getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const startOfWeek = new Date(date.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  }

  getWeekNumber(date: Date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  resetTimeTable() {
    this.startOfWeek = this.getStartOfWeek(new Date(this.selectedDate));
    this.endOfWeek = new Date(this.startOfWeek);
    this.endOfWeek.setDate(this.startOfWeek.getDate() + 4);
    this.endOfWeek.setHours(23, 59, 59, 999);

    let localTimeTables: TimeTable[] = [];

    this.timeTables.forEach(timeTable => {
      let timeStartDate = new Date(timeTable.timeStart);

      if (timeStartDate >= this.startOfWeek && timeStartDate <= this.endOfWeek) {
        const dayIndex = timeStartDate.getDay();
        const adjustedDayIndex = dayIndex === 0 ? 6 : dayIndex - 1;

        if (adjustedDayIndex < 0 || adjustedDayIndex > 4) {
          return; // Skip if not Monday to Friday
        }

        localTimeTables.push(timeTable);
      }
    });

    localTimeTables.sort((a, b) => new Date(a.timeStart).getTime() - new Date(b.timeStart).getTime());

    let dates: Date[] = [];
    for (let i = 0; i < 5; i++) {
      let date = new Date(this.startOfWeek);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }

    let timeList: Time[] = this.getTimeList(localTimeTables);
    console.log(timeList)

    this.timeStrings = [];
    if (timeList.length === 0) {
      this.timeStrings = Array.from({length: 11}, (_, i) => `${String(i + 8).padStart(2, '0')}:00`);
    } else {
      timeList.forEach(time => {
        let minMinutes = new Date(time.timeTableCells[0].timeTable.timeStart).getMinutes();
        let minGcd = Number.MAX_VALUE;
        time.timeTableCells.forEach(timeTableCell => {
          let timeTable = timeTableCell.timeTable;
          let timeStartDate = new Date(timeTable.timeStart);
          let timeEndDate = new Date(timeTable.timeEnd);
          if(timeStartDate.getMinutes() < minMinutes && timeStartDate.getMinutes() != 0) {
            minMinutes = timeStartDate.getMinutes();
          }
          if(timeEndDate.getMinutes() < minMinutes && timeEndDate.getMinutes() != 0) {
            minMinutes = timeEndDate.getMinutes();
          }
          let gcd = Math.min(getDateGcd(timeStartDate.getMinutes(), minMinutes), getDateGcd(timeEndDate.getMinutes(), minMinutes));
          minGcd = Math.min(minGcd, gcd);
          console.log(minMinutes)
          console.log(minGcd)
          console.log("--------------")
        });

        time.timeTableCells.forEach(timeTableCell => {
          console.log(minGcd)

          let timeTable = timeTableCell.timeTable;
          let timeStartDate = new Date(timeTable.timeStart);
          let timeEndDate = new Date(timeTable.timeEnd);



          while (timeStartDate <= timeEndDate) {
            let timeStart = getTimeString(timeStartDate);

            if (!this.timeStrings.includes(timeStart)) {
              this.timeStrings.push(timeStart);
            }

            if (minGcd == 0) {
              timeStartDate.setHours(timeStartDate.getHours() + 1);
            } else {
              timeStartDate.setMinutes(timeStartDate.getMinutes() + minGcd);
            }
          }

        });


      });
      this.timeStrings.sort((a, b) => a.localeCompare(b));
      console.log(this.timeStrings)
    }

    this.grid = [];
    for (let date of dates) {
      let day = new Day(date, []);

      for (let i = 0; i < this.timeStrings.length - 1; i++) {
        let timeString = this.timeStrings[i];
        let formattedTimeString = timeString += ':00';
        let time = timeList.find(time => {
          let timeStartString = getTimeString(new Date(time.timeStartDate));
          let timeEndString = getTimeString(new Date(time.timeEndDate));

          return (formattedTimeString >= timeStartString && formattedTimeString <= timeEndString) &&
            getDateString(time.timeStartDate) === getDateString(day.date);
        });

        if (time == undefined) {
          day.times.push(new Time(new Date(), new Date(), []));
        } else if (!day.times.includes(time)) {
          day.times.push(time)
        }
      }

      this.grid.push(day);
    }

  }

  changeWeekTo(weekNumber: number) {
    this.selectedWeekNumber = weekNumber;
    let currentWeek = this.getStartOfWeek(new Date());
    let currentWeekNumber = this.getWeekNumber(currentWeek);
    let offsetWeeks = weekNumber - currentWeekNumber;
    this.selectedDate = new Date(currentWeek);
    this.selectedDate.setDate(this.selectedDate.getDate() + offsetWeeks * 7);
    this.resetTimeTable();
  }

  private getTimeList(localTimeTables: TimeTable[]) {
    let timeList: Time[] = [];

    localTimeTables.forEach(timeTable => {
      let timeStartDate = new Date(timeTable.timeStart);
      let timeEndDate = new Date(timeTable.timeEnd);

      let time = timeList.find(time => {
        return (timeStartDate >= time.timeStartDate && timeStartDate < time.timeEndDate) ||
          (timeEndDate > time.timeStartDate && timeEndDate <= time.timeEndDate);
      })

      if (time === undefined) {
        timeList.push(new Time(timeStartDate, timeEndDate, [new TimeTableCell(timeTable, true)]));
      } else {
        if (timeStartDate < time.timeStartDate) {
          time.timeStartDate = timeStartDate;
        }
        if (timeEndDate > time.timeEndDate) {
          time.timeEndDate = timeEndDate;
        }
        time.timeTableCells.push(new TimeTableCell(timeTable));
      }
    });

    timeList.forEach(time => {
      time.timeTableCells.forEach(timeTableCell => {
        timeTableCell.setDisplayBooleans(time);
      });
    });

    return timeList;
  }

  getColumnTemplateRows() {
    return `30px repeat(${this.timeStrings.length}, ${(this.cellHeight)}px)`
  }

  getTemplateRows(time: Time) {
    return `repeat(${this.getSpan(time.timeStartDate.toISOString(), time.timeEndDate.toISOString()) - 1}, ${this.cellHeight}px) ${this.cellHeight - 2}px`;
  }


  getSpan(timeStartString: string, timeEndString: string) {
    let timeStartStringTemp = getTimeString(new Date(timeStartString));
    let timeEndStringTemp = getTimeString(new Date(timeEndString));

    let startIndex = this.timeStrings.indexOf(timeStartStringTemp);
    let endIndex = this.timeStrings.indexOf(timeEndStringTemp);
    return endIndex - startIndex;
  }

  getSpanString(timeStartString: string, timeEndString: string) {
    return `span ${this.getSpan(timeStartString, timeEndString)}`;
  }

  getHours(timeStartString: string, timeEndString: string) {
    return getDateTimeDifference(timeStartString, timeEndString).hours;
  }


  onResize(event: ResizeObserverEntry) {
    let availableHeight = window.innerHeight * 0.9;
    this.cellHeight = availableHeight / this.timeStrings.length;
  }
}

class Day {
  date: Date;
  times: Time[] = [];

  constructor(date: Date, times: Time[]) {
    this.date = date;
    this.times = times;
  }
}

class Time {
  timeStartDate: Date;
  timeEndDate: Date;

  timeTableCells: TimeTableCell[] = [];

  constructor(timeStartDate: Date, timeEndDate: Date, timeTableCells: TimeTableCell[]) {
    this.timeStartDate = timeStartDate;
    this.timeEndDate = timeEndDate;
    this.timeTableCells = timeTableCells;
  }

  displayTimeTableCell(timeTableCell: TimeTableCell) {
    this.timeTableCells.forEach(timeTableCell => timeTableCell.displayed = false);
    timeTableCell.displayed = true;
  }
}

export class TimeTableCell {
  timeTable: TimeTable;
  displayed: boolean = false;
  displayBooleans: boolean[] = [];

  constructor(timeTable: TimeTable, displayed: boolean = false) {
    this.timeTable = timeTable;
    this.displayed = displayed;
  }

  setDisplayBooleans(time: Time) {
    let mainTimeStartDateTemp = new Date(time.timeStartDate);
    let mainTimeEndDateTemp = new Date(time.timeEndDate);

    let timeStartDate = new Date(this.timeTable.timeStart);
    let timeEndDate = new Date(this.timeTable.timeEnd);

    let gcd = getSmallestGcd(time);
    while (mainTimeStartDateTemp < mainTimeEndDateTemp) {
      if (mainTimeStartDateTemp >= timeStartDate && mainTimeStartDateTemp < timeEndDate) {
        if (!this.displayBooleans[this.displayBooleans.length - 1]) {
          this.displayBooleans.push(true);
        }
      } else {
        this.displayBooleans.push(false);
      }

      if (gcd == 0) {
        mainTimeStartDateTemp.setHours(mainTimeStartDateTemp.getHours() + 1);
      } else {
        mainTimeStartDateTemp.setMinutes(mainTimeStartDateTemp.getMinutes() + gcd);
      }
    }
  }
}

function getSmallestGcd(time: Time) {
  let gcd = Number.MAX_VALUE;
  let minutesList: number[] = [];

  for (let timeTableCell of time.timeTableCells) {
    let timeStartDate = new Date(timeTableCell.timeTable.timeStart);
    let timeEndDate = new Date(timeTableCell.timeTable.timeEnd);

    if (timeStartDate.getMinutes() != 0) {
      minutesList.push(timeStartDate.getMinutes());
    }
    if (timeEndDate.getMinutes() != 0) {
      minutesList.push(timeEndDate.getMinutes());
    }
  }

  for (let i = 0; i < minutesList.length; i++) {
    for (let j = 0; j < minutesList.length; j++) {
      if (i != j) {
        gcd = Math.min(gcd, getGcd(minutesList[i], minutesList[j]));
      }
    }
  }

  return gcd == Number.MAX_VALUE ? 0 : gcd
}

function getDateGcd(timeStartMinutes: number, timeEndMinutes: number) {
  let gcd = 0;

  if (timeStartMinutes != 0 && timeEndMinutes != 0) {
    gcd = getGcd(timeStartMinutes, timeEndMinutes);
  } else if (timeStartMinutes != 0) {
    gcd = timeStartMinutes;
  } else if (timeEndMinutes != 0) {
    gcd = timeEndMinutes;
  }
  return gcd;
}
