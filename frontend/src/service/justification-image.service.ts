import {Injectable} from "@angular/core";
import {EntityService} from "./entity.service";
import {HttpClient} from "@angular/common/http";
import {JustificationImage} from "../model/justification-image";

@Injectable({
  providedIn: 'root'
})
export class JustificationImageService extends EntityService<JustificationImage> {
  constructor(http: HttpClient) {
    super(http, "justification-image");
  }
}
