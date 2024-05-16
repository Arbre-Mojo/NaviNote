import { User } from "./user";

export class Student extends User {
  constructor(firstName: string, lastName: string,
              email: string, password: string,
              token?: string | undefined,
              pfpImgPath?: string | undefined,
              pfpImgUrl?: string | undefined) {
    super(firstName, lastName, email, password, token, pfpImgPath, pfpImgUrl);
  }

  static override fromJson(jsonStudent: Student): Student {
    return new Student(jsonStudent.firstName, jsonStudent.lastName,
      jsonStudent.email, jsonStudent.password, jsonStudent.token, jsonStudent.pfpImgPath,
      jsonStudent.pfpImgUrl);
  }
}
