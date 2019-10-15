import {Component, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../questions.model';
import {Router} from '@angular/router';
import {QUESTOES_CRIAR, QUESTOES_LISTAR} from '../../../shared/constants/routes.contants';

@Component({
  selector: 'app-questions-card',
  templateUrl: './questions-card.component.html',
  styleUrls: ['./questions-card.component.scss']
})
export class QuestionsCardComponent implements OnInit {

  @Input() question: Question;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  handleDetalhes() {
    console.log('detalhes');
    this.router.navigate([QUESTOES_CRIAR]);
  }

  handleEliminar() {
    console.log('eliminar');
    this.router.navigate([QUESTOES_LISTAR]);
  }
}
