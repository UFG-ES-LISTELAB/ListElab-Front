import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionsService} from './questions.service';
import {Question} from './questions.model';

const ELEMENT_DATA: Question[] = [
  {id: 1,   enunciado: 'Hydrogen',  areaConhecimento: 'Computação',     tipo: 'Discursiva',  dificuldade: 'Fácil' },
  {id: 2,   enunciado: 'Helium',    areaConhecimento: 'Computação',     tipo: 'Discursiva', dificuldade: 'Fácil' },
  {id: 3,   enunciado: 'Lithium',   areaConhecimento: 'Computação',      tipo: 'Discursiva', dificuldade: 'Fácil' },
  {id: 4,   enunciado: 'Beryllium', areaConhecimento: 'Computação',     tipo: 'Discursiva', dificuldade: 'Fácil' },
  {id: 5,   enunciado: 'Boron',     areaConhecimento: 'Computação',     tipo: 'Discursiva',  dificuldade: 'Fácil' },
  {id: 6,   enunciado: 'Carbon',    areaConhecimento: 'Computação',    tipo: 'Discursiva',  dificuldade: 'Fácil' },
  {id: 7,   enunciado: 'Nitrogen',  areaConhecimento: 'Computação',    tipo: 'Discursiva',  dificuldade: 'Fácil' },
  {id: 8,   enunciado: 'Oxygen',    areaConhecimento: 'Computação',    tipo: 'Discursiva',  dificuldade: 'Fácil' },
  {id: 9,   enunciado: 'Fluorine',  areaConhecimento: 'Computação',    tipo: 'Discursiva',  dificuldade: 'Fácil' },
  {id: 10,  enunciado: 'Neon',      areaConhecimento: 'Computação',    tipo: 'Discursiva', dificuldade: 'Fácil' },
];

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  displayedColumns: string[] = [ 'enunciado', 'areaConhecimento', 'tipo', 'dificuldade' ];
  dataSource = ELEMENT_DATA;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
    // this.questionsService.getQuestions()
    //   .subscribe(questions => this.questions = questions);
  }

}
