import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {TimeTableCell} from "../time-table.component";

@Component({
  selector: 'app-subject-wrapper-element',
  standalone: true,
  imports: [],
  templateUrl: './subject-wrapper-element.component.html',
  styleUrl: './subject-wrapper-element.component.scss'
})
export class SubjectWrapperElementComponent implements OnInit {

  @Input() timeTableCell!: TimeTableCell;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.el.nativeElement.style.width = `100%`;
    this.el.nativeElement.style.height = `100%`;
  }
}
