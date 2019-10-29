import Swal from 'sweetalert2';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DiscursiveQuestion, Question} from '../../questions.model';
import {Router} from '@angular/router';
import {QuestionsService} from '../../questions.service';

import {QUESTOES_CRIAR} from '../../../shared/constants/routes.contants';

@Component({
  selector: 'app-questions-card',
  templateUrl: './questions-card.component.html',
  styleUrls: ['./questions-card.component.scss']
})
export class QuestionsCardComponent implements OnInit {

  @Input() question: DiscursiveQuestion;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter<Question>();

  constructor(private router: Router,
              private questionService: QuestionsService) { }

  ngOnInit() {
  }

  onSelect() {
    this.selected.emit(this.question);
  }

  onDelete() {
    this.deleted.emit(this.question);
  }
}
