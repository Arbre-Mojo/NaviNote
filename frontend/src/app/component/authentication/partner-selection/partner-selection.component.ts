import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {LogoComponent} from "../../logo/logo.component";
import {CookieService} from "ngx-cookie-service";
import {CookieComponent} from "../../misc/cookie-component";
import {FooterComponent} from "../../footer/footer.component";
import {NgxResizeObserverModule} from "ngx-resize-observer";
import {userCategories, UserCategory} from "../../../../service/user/userCategories";

@Component({
  selector: 'app-partner-selection',
  standalone: true,
  imports: [
    NgForOf,
    NgIf, LogoComponent, FooterComponent, NgxResizeObserverModule
  ],
  templateUrl: './partner-selection.component.html',
  styleUrls: ['../auth.styles.scss', './partner-selection.component.css']
})
export class PartnerSelectionComponent extends CookieComponent {
  protected readonly userCategories = userCategories;

  constructor(
    protected override cookieService: CookieService,
    protected override router: Router, override route: ActivatedRoute) {
    super();
  }

  userOnSelected(userCategory: UserCategory) {
    this.setCurrentUserCategory(userCategory);
    this.router.navigate(['/login'], {relativeTo: this.route}).then();
  }
}
