import {HttpClient} from "@angular/common/http";
import {Course} from "../model/course";
import {EntityService} from "./entity.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CourseService extends EntityService<Course> {
  constructor(http: HttpClient) {
    super(http, "course");
  }
}
