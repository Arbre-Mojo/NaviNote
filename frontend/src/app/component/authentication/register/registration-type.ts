
import {EditingUserType} from "../../misc/editing-user-type";
import {adminCategory, professorCategory, studentCategory, UserCategory} from "../../../../service/user/userCategories";

export class RegistrationType {
  headerTitle: string;
  userCategory: UserCategory;
  editingUserType: EditingUserType;
  buttonTitle: string;


  constructor(headerTitle: string, userCategory: UserCategory, editingUserType: EditingUserType, buttonTitle: string) {
    this.headerTitle = headerTitle;
    this.userCategory = userCategory;
    this.editingUserType = editingUserType;
    this.buttonTitle = buttonTitle;
  }

  hasHeader() {
    return this.headerTitle.length > 0;
  }
}

export const studentRegistrationTypeUSER = new RegistrationType('Create An Account',
  studentCategory, EditingUserType.USER, 'Register');
export const studentRegistrationTypeADMIN = new RegistrationType('',
  studentCategory, EditingUserType.ADMIN, 'Create Account');
export const professorRegistrationTypeUSER = new RegistrationType('Apply As A Professor',
  professorCategory, EditingUserType.USER, 'Apply');
export const professorRegistrationTypeADMIN = new RegistrationType('',
  professorCategory, EditingUserType.ADMIN, 'Create Account');
export const adminRegistrationTypeADMIN = new RegistrationType('',
  adminCategory, EditingUserType.ADMIN, 'Create Account');

export const registrationTypes =
  [
    studentRegistrationTypeUSER,
    professorRegistrationTypeUSER,
  ];
