import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {Question, QuestionFiltersDto} from './questions.model';
import {API} from "../shared/constants/api.constants";


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  selectedQuestion: Question;

  constructor(private http: HttpClient) {}

  getAll(params?: QuestionFiltersDto): Observable<any> {
    return params ? this.getAllWithParams(params) : this.http.get(`${environment.api}/${API.questoes.base}`);
  }

  getAllWithParams(params?: any): Observable<any> {
    if(params) {
      let body = {};
      if(params.tipo >= 0) {
        body = { ...body, tipo: params.tipo };
      }
      if(params.areaDeConhecimentoId !== "") {
        body = { ...body, areaDeConhecimento: { codigo: params.areaDeConhecimentoId, descricao: "" } };
      }
      if(params.nivelDificuldadeId !== "") {
        body = { ...body, nivelDificuldade: parseInt(params.nivelDificuldadeId) };
      }
      if(params.disciplinaId !== "") {
        body = { ...body, disciplina: { codigo: params.disciplinaId, descricao: "" }};
      }
      if(params.tempoMaximoDeResposta >= 0) {
        body = { ...body, tempoMaximoDeResposta: params.tempoMaximoDeResposta };
      }
      return this.http.post(`${environment.api}/${API.questoes.base}/consulte`, body);
    }
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

  gellAllDisciplinas() : Observable<any> {
    return this.http.get(`${environment.api}/api/Disciplina`);
  }

}
