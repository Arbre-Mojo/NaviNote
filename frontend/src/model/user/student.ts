import {User} from "./user";
import {Promo} from "../promo";

export class Student extends User {
  override promoId: number;

  promo: Promo | undefined;

  constructor(firstName: string, lastName: string,
              email: string, password: string,
              promoId: number,
              studentId?: number | undefined,
              token?: string | undefined,
              pfpImgPath?: string | undefined,
              pfpImgUrl?: string | undefined) {
    super(firstName, lastName, email, password, studentId, token, pfpImgPath, pfpImgUrl);
    this.promoId = promoId;
    this.studentId = studentId;
  }

  static override fromJson(jsonStudent: Student): Student {
    let student = new Student(jsonStudent.firstName, jsonStudent.lastName,
      jsonStudent.email, jsonStudent.password, jsonStudent.promoId, jsonStudent.studentId,
      jsonStudent.token, jsonStudent.pfpImgPath,
      jsonStudent.pfpImgUrl);
    if(jsonStudent.promo != undefined) student.promo = Promo.fromJson(jsonStudent.promo);

    return student;
  }
}
