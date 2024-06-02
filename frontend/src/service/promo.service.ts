import {HttpClient} from "@angular/common/http";
import {EntityService} from "./entity.service";
import {Promo} from "../model/promo";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PromoService extends EntityService<Promo> {
  constructor(http: HttpClient) {
    super(http, "promo");
  }
}
