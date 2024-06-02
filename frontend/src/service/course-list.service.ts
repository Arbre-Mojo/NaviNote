import {HttpClient} from "@angular/common/http";
import {CourseList} from "../model/course-list";
import {EntityService} from "./entity.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CourseListService extends EntityService<CourseList> {
  constructor(http: HttpClient) {
    super(http, "course");
  }
}
