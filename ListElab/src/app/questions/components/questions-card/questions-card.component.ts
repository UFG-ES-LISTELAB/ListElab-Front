import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-questions-card',
  templateUrl: './questions-card.component.html',
  styleUrls: ['./questions-card.component.scss']
})
export class QuestionsCardComponent implements OnInit {

  @Input() tipo: string;
  @Input() dificuldade: string;
  @Input() disciplina: string;
  @Input() areaConhecimento: string;
  @Input() enunciado: string;
  @Input() autor: string;
  @Input() tags: string;

  constructor() { }

  ngOnInit() {
  }

}
