import {User} from "../../model/user/user";
import {Injectable} from "@angular/core";
import {Admin} from "../../model/user/admin";
import {Professor} from "../../model/user/professor";
import {Student} from "../../model/user/student";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private counter: number = 0;

  private _user!: User | undefined;
  private _admin!: Admin | undefined;
  private _student!: Student | undefined;
  private _professor!: Professor | undefined;

  private mainPromise!: Promise<boolean>;

  constructor() {
  }

  public getCounter(): number {
    return this.counter;
  }

  public incrementCounter(): void {
    this.counter++;
  }

  isLoggedIn(): boolean {
    return this._user !== undefined && this._user !== null;
  }

  getMainPromise(): Promise<boolean> {
    return this.mainPromise;
  }

  setMainPromise(mainPromise: Promise<boolean>): void {
    this.mainPromise = mainPromise;
  }

  get user(): User | undefined {
    return this._user;
  }

  set user(user: User | undefined) {
    this._user = user;
  }

  get admin(): Admin | undefined {
    return this._admin;
  }

  set admin(value: Admin| undefined) {
    this._admin = value;
  }

  get student(): Student | undefined {
    return this._student;
  }

  set student(value: Student| undefined) {
    this._student = value;
  }

  get professor(): Professor | undefined {
    return this._professor;
  }

  set professor(value: Professor| undefined) {
    this._professor = value;
  }

  setUsersToNull() {
    this.user = undefined;
    this.admin = undefined;
    this.student = undefined;
    this.professor = undefined;
  }
}
