import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {QUESTOES_CRIAR} from '../../../shared/constants/routes.contants';
import {LoginService} from '../../../login/login.service';

@Component({
  selector: 'app-questions-search',
  templateUrl: './questions-search.component.html',
  styleUrls: ['./questions-search.component.scss']
})
export class QuestionsSearchComponent implements OnInit {

  @Output() submitted = new EventEmitter();
  @Output() questionNew = new EventEmitter();

  searchForm: FormGroup;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      buscar: [''],
      autor: [''],
      nivelDificuldade: [''],
      tipo: [''],
      areaDeConhecimento: [''],
      // disciplina: [''],
      tempoMaximoDeResposta: [''],
      tags: ['']
    });
  }

  handleQuestionNew() {
    this.questionNew.emit();
  }

  handleFormSubmition() {
    this.submitted.emit(this.searchForm.value);
  }

}
