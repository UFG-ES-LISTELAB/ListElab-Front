import Swal from 'sweetalert2';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../questions.model';
import {Router} from '@angular/router';

import {QUESTOES_CRIAR} from '../../../shared/constants/routes.contants';

@Component({
  selector: 'app-questions-card',
  templateUrl: './questions-card.component.html',
  styleUrls: ['./questions-card.component.scss']
})
export class QuestionsCardComponent implements OnInit {

  @Input() question: Question;
  @Output() selectedDetail = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  selectDetail() {
    this.selectedDetail.emit();
  }

  selectDelete() {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'A operação não poderá ser revertida!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Removida!',
          'Sua questão foi removida.',
          'success'
        );
      }
    });
  }
}
