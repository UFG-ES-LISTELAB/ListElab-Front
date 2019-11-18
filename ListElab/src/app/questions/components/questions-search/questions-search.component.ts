import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as fromQuestionsModels from '../../questions.model';
import {ApiResponse} from '../../../shared/models/api-response.model';
import {QuestionsService} from '../../questions.service';


@Component({
  selector: 'app-questions-search',
  templateUrl: './questions-search.component.html',
  styleUrls: ['./questions-search.component.scss']
})
export class QuestionsSearchComponent implements OnInit {

  @Output() submitted = new EventEmitter();
  @Output() questionNew = new EventEmitter();

  searchForm: FormGroup;
  areasDeConhecimento: fromQuestionsModels.KnowlegdeArea[] = [];
  disciplinas: fromQuestionsModels.Discipline[] = [];

  constructor(private fb: FormBuilder,
              private questionService: QuestionsService) { }
  
  getAreasDeConhecimento() : void {
    this.questionService.getAllAreaDeconhecimento().subscribe((response: ApiResponse) => {
      this.areasDeConhecimento = response.resultado;
    }, error => console.log("Erro na obtenção das áreas de conhecimento - Pesquisa!"));
  }

  getDisciplinas(): void {
    this.questionService.getAllAreaDeconhecimento().subscribe((response: ApiResponse) => {
      this.disciplinas = response.resultado;
    },  error => console.log("Erro na obtenção das disciplinas - Pesquisa!"));
  }

  ngOnInit() {
    this.getAreasDeConhecimento();
    this.getDisciplinas();
    
    this.searchForm = this.fb.group({
      enunciado: [''],
      tags: [''],
      areaDeConhecimento: [''],
      disciplina: [''],
      tipoQuestao: [],
      tempoRespostaEsperado: [''],
      nivelDificuldade: [''],
      autor: ['']
    });
  }

  onQuestionNew() {
    this.questionNew.emit();
  }

  onFormSubmitted() {
    console.log(this.searchForm.value);
    // this.submitted.emit(this.searchForm.value);
  }

}
