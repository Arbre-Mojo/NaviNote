import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {Student} from "../../model/user/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService extends UserService<Student> {

  constructor(http: HttpClient) {
    super(http, "student");
  }
}
