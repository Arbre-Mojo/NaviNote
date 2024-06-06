import {faBook, faCalendar, faClock, faList, faMessage} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {
  adminCategory,
  professorCategory,
  studentCategory,
  userCategories,
  UserCategory
} from "../../../service/user/userCategories";

export class NavigationItem {
  constructor(private name: string, private link: string, private faIcon: IconDefinition, private allowedUserCategories: UserCategory[] = userCategories) {
  }

  getName(): string {
    return this.name;
  }

  getLink(): string {
    return this.link;
  }

  getIcon(): IconDefinition {
    return this.faIcon;
  }

  isAllowedForUserCategory(userCategory: UserCategory): boolean {
    return this.allowedUserCategories.includes(userCategory);
  }
}

export const absencesAndTardinessNavigationItem = new NavigationItem("Absences And Tardiness", "/absences-and-tardiness", faClock, [studentCategory]);
export const manageJustificationsNavigationItem = new NavigationItem("Manage Justifications", "/manage-justifications", faBook, [adminCategory]);
export const timeTableNavigationItem = new NavigationItem("Time Table", "/time-table", faCalendar);
export const attendanceNavigationItem = new NavigationItem("Attendance", "/attendance", faList, [professorCategory, adminCategory]);
export const messagesNavigationItem = new NavigationItem("Messages", "/messages", faMessage);

export const navigationItems = [
  absencesAndTardinessNavigationItem,
  manageJustificationsNavigationItem,
  timeTableNavigationItem,
  attendanceNavigationItem,
  messagesNavigationItem,
];
