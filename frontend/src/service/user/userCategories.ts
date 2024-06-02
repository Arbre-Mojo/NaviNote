export class UserCategory {
  name: string;
  pluralName: string;

  constructor(name: string, pluralName: string) {
    this.name = name;
    this.pluralName = pluralName;
  }

  static fromJson(json: string | null): UserCategory {
    let userCategory: UserCategory | undefined;
    if (json != null) {
      userCategory = userCategories.find(category => category.name === JSON.parse(json).name)
    }

    if (userCategory === undefined) {
      return studentCategory
    } else {
      return userCategory;
    }
  }

  getFormattedName(): string {
    return this.name.toLowerCase().replace(new RegExp('\\s'), "-");
  }

  getFormattedPluralName(): string {
    return this.pluralName.toLowerCase().replace(new RegExp('\\s'), "-");
  }
}

export const adminCategory = new UserCategory('Admin', 'Admins');
export const professorCategory = new UserCategory('Professor', 'Professors');
export const studentCategory = new UserCategory('Student', 'Students');
export const userCategories: UserCategory[] = [
  adminCategory,
  professorCategory,
  studentCategory,
];
