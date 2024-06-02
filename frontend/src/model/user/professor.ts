import {User} from "./user";

export class Professor extends User {
  constructor(firstName: string, lastName: string,
              email: string, password: string,
              professorId?: number | undefined,
              token?: string | undefined,
              pfpImgPath?: string | undefined,
              pfpImgUrl?: string | undefined) {
    super(firstName, lastName, email, password, professorId, token, pfpImgPath, pfpImgUrl);
    this.professorId = professorId;
  }

  static override fromJson(jsonProfessor: Professor): Professor {
    return new Professor(jsonProfessor.firstName, jsonProfessor.lastName,
      jsonProfessor.email, jsonProfessor.password, jsonProfessor.professorId, jsonProfessor.token, jsonProfessor.pfpImgPath,
      jsonProfessor.pfpImgUrl);
  }
}
