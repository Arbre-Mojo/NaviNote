import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {TimeTableCell} from "../time-table.component";
import {getDateString, getTimeString} from "../../misc/functions";

@Component({
  selector: 'app-subject-wrapper-element',
  standalone: true,
  imports: [],
  templateUrl: './subject-wrapper-element.component.html',
  styleUrl: './subject-wrapper-element.component.scss'
})
export class SubjectWrapperElementComponent implements OnInit {

  @Input() timeTableCell!: TimeTableCell;
  timeStartString = "";
  timeEndString = "";

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.timeStartString = getTimeString(new Date(this.timeTableCell?.timeTable.timeStart));
    this.timeEndString = getTimeString(new Date(this.timeTableCell?.timeTable.timeEnd));

    this.el.nativeElement.style.width = `100%`;
    this.el.nativeElement.style.height = `100%`;
  }

  protected readonly getTimeString = getTimeString;
  protected readonly getDateString = getDateString;
}
