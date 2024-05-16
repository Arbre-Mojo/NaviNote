export class User {
  protected userId: number | undefined;

  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token: string | undefined;
  pfpImgPath: string | undefined;

  adminId: number | undefined;
  studentId: number | undefined;
  professorId: number | undefined;

  // PFP IMAGE URL (COMPUTED WHEN NEEDED)
  pfpImgUrl: string | undefined;
  
  constructor(firstName: string, lastName: string, 
              email: string, password: string, token?: string | undefined, pfpImgPath?: string | undefined, 
              pfpImgUrl?: string | undefined) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.token = token;
    this.pfpImgPath = pfpImgPath;
    this.pfpImgUrl = pfpImgUrl;
  }

  static fromJson(jsonUser: User): User {
    let user: User = new User(jsonUser.firstName, jsonUser.lastName, jsonUser.email, jsonUser.password,
      jsonUser.token, jsonUser.pfpImgPath, jsonUser.pfpImgUrl)

    user.userId = jsonUser.userId;
    user.adminId = jsonUser.adminId;
    user.studentId = jsonUser.studentId;
    user.professorId = jsonUser.professorId;

    return user;
  }
  
  getUserId(): number {
    return this.userId!;
  }
  
  setFirstName(firstName: string) {
    this.firstName = firstName;
  }
  
  setLastName(lastName: string) {
    this.lastName = lastName;
  }

  setPfpImgPath(pfpImgPath: string) {
    this.pfpImgPath = pfpImgPath;
  }

  setToken(token: string) {
    this.token = token;
  }

  setPassword(password: string) {
    this.password = password;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPfpImgUrl(pfpImgUrl: string) {
    this.pfpImgUrl = pfpImgUrl;
  }

  hasPfpImg(): boolean {
    return this.pfpImgPath !== null &&
      this.pfpImgPath !== undefined &&
      this.pfpImgPath.length > 0;
  }

  getPfpImgPrefix(): string {
    return this.userId + "-";
  }
  
}
