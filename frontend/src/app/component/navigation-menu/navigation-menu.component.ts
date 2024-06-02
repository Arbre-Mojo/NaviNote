import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavigationItem} from "./navigation-item";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgForOf, NgIf} from "@angular/common";
import {CookieService} from "ngx-cookie-service";
import {CookieComponent} from "../misc/cookie-component";

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.scss'
})
export class NavigationMenuComponent extends CookieComponent {

  @Input() navigationItems!: NavigationItem[];
  @Output() clickedOnEmitter = new EventEmitter<NavigationItem>();

  constructor(protected override cookieService: CookieService) {
    super();
  }

  onClick(navigationItem: NavigationItem) {
    this.clickedOnEmitter.emit(navigationItem);
  }
}
