import {Component, Input, OnInit} from '@angular/core';
import {CookieComponent} from "../../misc/cookie-component";
import {CurrentUserService} from "../../../../service/user/current-user.service";
import {StudentService} from "../../../../service/user/student.service";
import {AdminService} from "../../../../service/user/admin.service";
import {ProfessorService} from "../../../../service/user/professor.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {Justification} from "../../../../model/justification";
import {faDownload, faUser} from "@fortawesome/free-solid-svg-icons";
import {NgForOf, NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {JustificationService} from "../../../../service/justification.service";
import {getDateTime} from "../../misc/functions";
import {JustificationImage} from "../../../../model/justification-image";

@Component({
  selector: 'app-justification',
  standalone: true,
  imports: [
    NgIf,
    FaIconComponent,
    NgxResizeObserverModule,
    NgForOf
  ],
  templateUrl: './justification.component.html',
  styleUrl: './justification.component.scss'
})
export class JustificationComponent extends CookieComponent implements OnInit {

  protected readonly getDateTime = getDateTime;

  faDownload = faDownload;
  faUser = faUser;

  @Input() justification!: Justification;

  hasImages: boolean = false;

  justify: string = 'center';

  constructor(protected override currentUserService: CurrentUserService,
              protected override studentService: StudentService,
              protected override adminService: AdminService,
              protected override professorService: ProfessorService,
              protected override cookieService: CookieService,
              protected override justificationService: JustificationService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.hasImages = this.justification.justificationImageList.length > 0;
    console.log(this.justification)
  }

  onResize(entry: ResizeObserverEntry) {
    let height = entry.contentRect.height;
    let width = entry.contentRect.width;

    if ((width / 2) < height) {
      this.justify = 'start';
    } else {
      this.justify = 'center';
    }
  }

  getJustificationAccepted() {
    if (this.justification.accepted === true) {
      return 'Accepted';
    } else if (this.justification.accepted === false) {
      return 'Rejected';
    } else {
      return 'Pending';
    }
  }

  updateJustification(accepted: boolean) {
    this.justification.accepted = accepted;
    this.justificationService.updateEntity(this.justification).subscribe({
      next: () => {
        console.log("Justification updated to " + accepted);
      },
      error: (error: any) => console.error(error)
    });
  }

  onDownload(justificationImage: JustificationImage) {
    const link = document.createElement("a");
    link.href = justificationImage.imageUrl!;
    link.download = justificationImage.name;
    link.click();
  }

  downloadAll() {
    this.justification.justificationImageList.forEach(justificationImage => {
      this.onDownload(justificationImage);
    });
  }

  canBeAccepted(bool: boolean) {
    if(this.justification.accepted === null) {
      return bool;
    } else {
      return this.justification.accepted
    }
  }
}
