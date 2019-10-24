import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {API} from "../shared/constants/api.constants";
import {Question} from "../questions/questions.model";
import {HttpClient} from "@angular/common/http";
import {List} from "./lists.model";

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  selectedList: List;

  constructor(private http: HttpClient) { }

  getAll(params?): Observable<any> {
    return this.http.get(`${environment.api}/${API.listas.base}`);
  }

  getOne(id, params?): Observable<any> {
    return this.http.get(`${environment.api}/${API.listas.base}/${id}`);
  }

  create(question: Question): Observable<any> {
    return this.http.post(`${environment.api}/${API.listas.base}`, question);
  }

  update(question: Question): Observable<any> {
    return this.http.put(`${environment.api}/${API.listas.base}`, question);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${environment.api}/${API.listas.base}/${id}`);
  }
}
