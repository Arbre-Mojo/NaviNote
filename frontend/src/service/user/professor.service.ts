import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import {Observable} from "rxjs";
import {Professor} from "../../model/user/professor";

@Injectable({
  providedIn: 'root'
})
export class ProfessorService extends UserService<Professor> {

  constructor(http: HttpClient) {
    super(http, "professor");
  }

}
