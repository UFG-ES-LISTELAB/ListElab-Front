import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {Question} from './questions.model';
import {API} from "../shared/constants/api.constants";


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  selectedQuestion: Question;

  constructor(private http: HttpClient) {
  }

  getAll(params?: Question): Observable<any> {
    return this.http.post(`${environment.api}/${API.questoes.base}/consulte`, {
      tipo: 0,
      areaDeConhecimento: {
        codigo: "string",
        descricao: "string"
      },
      nivelDificuldade: 1,
      disciplina: {
        codigo: "string",
        descricao: "string"
      },
      tempoMaximoDeResposta: 0,
      usuario: "string"
    });
  }

  getOne(id, params?): Observable<any> {
    return this.http.get(`${environment.api}/${API.questoes.base}/${id}`);
  }

  create(question: Question): Observable<any> {
    return this.http.post(`${environment.api}/${API.questoes.base}`, question);
  }

  update(question: Question): Observable<any> {
    return this.http.put(`${environment.api}/${API.questoes.base}`, question);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${environment.api}/${API.questoes.base}/${id}`);
  }

}
