import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {TimeTableCell} from "../time-table.component";
import {getDateString, getTimeString} from "../../misc/functions";
import {AttendanceService} from "../../../../service/misc/attendance.service";
import {CookieComponent} from "../../misc/cookie-component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-subject-wrapper-element',
  standalone: true,
  imports: [],
  templateUrl: './subject-wrapper-element.component.html',
  styleUrl: './subject-wrapper-element.component.scss'
})
export class SubjectWrapperElementComponent extends CookieComponent implements OnInit {

  @Input() timeTableCell!: TimeTableCell;
  timeStartString = "";
  timeEndString = "";

  constructor(private el: ElementRef,
              private attendanceService: AttendanceService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.timeStartString = getTimeString(new Date(this.timeTableCell?.timeTable.timeStart));
    this.timeEndString = getTimeString(new Date(this.timeTableCell?.timeTable.timeEnd));

    this.el.nativeElement.style.width = `100%`;
    this.el.nativeElement.style.height = `100%`;
  }

  onClick() {
    if(this.isProfessorCategory() || this.isAdminCategory()) {
      this.attendanceService.timeTable = this.timeTableCell.timeTable;
      this.routeTo('/attendance');
    }
  }
}
