import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any> {
    return this.http.get(`${environment.api}/QuestaoDiscursiva`);
  }

}


// requisicao fake
// const questions = [
//   {
//     id: 1,
//     tipo: 'Discursiva',
//     enunciado: '3) Enunciado de uma questão que precisa ser respondida',
//     dificuldade: 'Fácil',
//     disciplina: 'História do Brasil',
//     areaConhecimento: 'Ciências Humanas',
//     autor: 'Desconhecido',
//     tag: 'Cabral',
//   },
//   {
//     id: 2,
//     tipo: 'Discursiva',
//     enunciado: '3) Enunciado de uma questão que precisa ser respondida',
//     dificuldade: 'Fácil',
//     disciplina: 'História do Brasil',
//     areaConhecimento: 'Ciências Humanas',
//     autor: 'Desconhecido',
//     tag: 'Cabral',
//   }
// ];
// return new Observable(observer => {
//   observer.next(questions);
// });
