import Swal from 'sweetalert2';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {DiscursiveQuestion, Question} from '../../questions.model';
import {Router} from '@angular/router';
import {QuestionsService} from '../../questions.service';
import {ListsService} from "../../../lists/lists.service";

@Component({
  selector: 'app-questions-card',
  templateUrl: './questions-card.component.html',
  styleUrls: ['./questions-card.component.scss']
})
export class QuestionsCardComponent implements OnInit {

  @Input() question: DiscursiveQuestion;
  @Output() detail = new EventEmitter<Question>();
  @Output() deleted = new EventEmitter<Question>();

  constructor(private router: Router,
              private listsService: ListsService,
              private questionService: QuestionsService) { }

  ngOnInit() {
  }

  onDetail() {
    this.detail.emit(this.question);
  }

  onDelete() {
    this.deleted.emit(this.question);
  }
}
