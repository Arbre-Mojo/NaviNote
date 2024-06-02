import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faArrowRightFromBracket, faGear, faLock, faMessage, faUserGroup} from "@fortawesome/free-solid-svg-icons";
import {
  adminCategory,
  professorCategory,
  studentCategory,
  userCategories,
  UserCategory
} from "../../../../service/user/userCategories";
import {
  adminRegistrationTypeADMIN,
  professorRegistrationTypeADMIN,
  RegistrationType,
  studentRegistrationTypeADMIN
} from "../../authentication/register/registration-type";


export class MenuItem {
  icon: IconDefinition;
  name: string;
  link: string;
  editingUserCategory!: UserCategory | undefined;
  registrationType!: RegistrationType | undefined;

  class: string = "profile-menu-item";
  allowedUserCategories: UserCategory[] = []

  constructor(icon: IconDefinition, name: string, link: string,
              allowedUserCategories: UserCategory[], editingUserCategory?: UserCategory,
              registrationType?: RegistrationType) {
    this.icon = icon;
    this.name = name;
    this.link = link;
    this.allowedUserCategories = allowedUserCategories;
    this.editingUserCategory = editingUserCategory;
    this.registrationType = registrationType;
  }
}

export const settings = new MenuItem(faGear, 'Settings',
  '/user-account/user-settings', userCategories);
export const connectionAndSecurity = new MenuItem(faLock,
  'Connection / Security', '/user-account/connection-security', userCategories);
export const manageStudents = new MenuItem(faUserGroup,
  `Manage ${studentCategory.pluralName}`,
  `/user-account/manage-users/${studentCategory.getFormattedPluralName()}`,
  [adminCategory],
  studentCategory, studentRegistrationTypeADMIN);
export const manageProfessors = new MenuItem(faUserGroup,
  `Manage ${professorCategory.pluralName}`,
  `/user-account/manage-users/${professorCategory.getFormattedPluralName()}`,
  [adminCategory],
  professorCategory, professorRegistrationTypeADMIN);
export const manageAdmins = new MenuItem(faUserGroup,
  `Manage ${adminCategory.pluralName}`,
  `/user-account/manage-users/${adminCategory.getFormattedPluralName()}`,
  [adminCategory],
  adminCategory, adminRegistrationTypeADMIN);
export const logout = new MenuItem(faArrowRightFromBracket, 'Logout',
  '', userCategories);

export const profileMenuItems: MenuItem[] = [
  settings,
  connectionAndSecurity,
  manageStudents,
  manageProfessors,
  manageAdmins,
  logout
];
