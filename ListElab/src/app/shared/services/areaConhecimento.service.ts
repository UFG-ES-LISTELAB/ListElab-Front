import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Question} from "../../questions/questions.model";
import {environment} from '../../../environments/environment';
import {API} from "../constants/api.constants";
// import {Question, QuestionFiltersDto, Discipline} from './questions.model';


@Injectable({
  providedIn: 'root'
})
export class AreaConhecimentoService {

  constructor(private http: HttpClient) {}

  getAll() : Observable<any> {
    return this.http.get(`${environment.api}/${API.areasDeConhecimento.base}`);
  }

}
