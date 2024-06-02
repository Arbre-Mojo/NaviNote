import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Email} from "../../model/misc/email";
import {Observable} from "rxjs";
import {environment} from "../../environment/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  protected apiBackendUrl = environment.apiBackendUrl;
  protected constructor(protected http: HttpClient) {}

  public sendEmail(email: Email): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiBackendUrl}/send-email`, email);
  }
}
