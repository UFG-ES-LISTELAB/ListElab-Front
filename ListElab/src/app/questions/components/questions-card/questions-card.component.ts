import {Component, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../questions.model';

@Component({
  selector: 'app-questions-card',
  templateUrl: './questions-card.component.html',
  styleUrls: ['./questions-card.component.scss']
})
export class QuestionsCardComponent implements OnInit {

  @Input() question: Question;

  constructor() { }

  ngOnInit() {
  }

  handleDetalhes() {
    console.log('detalhes');
  }

  handleEliminar() {
    console.log('eliminar');
  }
}
