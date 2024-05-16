import { User } from "./user";

export class Professor extends User {
  constructor(firstName: string, lastName: string,
              email: string, password: string,
              token?: string | undefined,
              pfpImgPath?: string | undefined,
              pfpImgUrl?: string | undefined) {
    super(firstName, lastName, email, password, token, pfpImgPath, pfpImgUrl);
  }

  static override fromJson(jsonProfessor: Professor): Professor {
    return new Professor(jsonProfessor.firstName, jsonProfessor.lastName,
      jsonProfessor.email, jsonProfessor.password, jsonProfessor.token, jsonProfessor.pfpImgPath,
      jsonProfessor.pfpImgUrl);
  }
}