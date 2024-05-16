import { User } from "./user";

export class Admin extends User {
  constructor(firstName: string, lastName: string,
              email: string, password: string, 
              token?: string | undefined, 
              pfpImgPath?: string | undefined,
              pfpImgUrl?: string | undefined) {
    super(firstName, lastName, email, password, token, pfpImgPath, pfpImgUrl);
  }
  
  static override fromJson(jsonAdmin: Admin): Admin {
    return new Admin(jsonAdmin.firstName, jsonAdmin.lastName, 
      jsonAdmin.email, jsonAdmin.password, jsonAdmin.token, jsonAdmin.pfpImgPath, 
      jsonAdmin.pfpImgUrl);
  }
}