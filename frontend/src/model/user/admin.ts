import {User} from "./user";

export class Admin extends User {
  constructor(firstName: string, lastName: string,
              email: string, password: string,
              adminId?: number | undefined,
              token?: string | undefined,
              pfpImgPath?: string | undefined,
              pfpImgUrl?: string | undefined) {
    super(firstName, lastName, email, password, adminId, token, pfpImgPath, pfpImgUrl);
    this.adminId = adminId;
  }

  static override fromJson(jsonAdmin: Admin): Admin {
    return new Admin(jsonAdmin.firstName, jsonAdmin.lastName,
      jsonAdmin.email, jsonAdmin.password, jsonAdmin.adminId,
      jsonAdmin.token, jsonAdmin.pfpImgPath,
      jsonAdmin.pfpImgUrl);
  }
}
