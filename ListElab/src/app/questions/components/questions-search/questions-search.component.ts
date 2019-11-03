import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-questions-search',
  templateUrl: './questions-search.component.html',
  styleUrls: ['./questions-search.component.scss']
})
export class QuestionsSearchComponent implements OnInit {

  @Output() submitted = new EventEmitter();
  @Output() questionNew = new EventEmitter();

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      tipo: [''],
      nivelDificuldadeId: [''],
      tempoMaximoDeResposta: [''],
      areaDeConhecimentoId: [''],
      disciplinaId: [''],
    });
  }

  onQuestionNew() {
    this.questionNew.emit();
  }

  onFormSubmitted() {
    this.submitted.emit(this.searchForm.value);
  }

}
