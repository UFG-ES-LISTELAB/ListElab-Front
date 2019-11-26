import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as fromQuestionsModels from '../../questions.model';
import {ApiResponse} from '../../../shared/models/api-response.model';
import {DiscursiveQuestionsService} from "../../discursiveQuestions.service";
import {DisciplinesService} from "../../../shared/services/disciplines.service";
import {AreaConhecimentoService} from "../../../shared/services/areaConhecimento.service";


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
              private disciplinesService: DisciplinesService,
              private areaConhecimentoService: AreaConhecimentoService,
              private discursiveQuestionsService: DiscursiveQuestionsService) {
  }

  ngOnInit() {
    this.getAreasDeConhecimento();
    this.getDisciplinas();

    this.searchForm = this.fb.group({
      enunciado: [''],
      nivelDificuldade: [],
      areaDeConhecimento: [''],
      tipo: [null],
      disciplina: [''],
      tempoEsperadoResposta: [0],
      usuario: [''],
      tags: ['']
    });
  }

  getAreasDeConhecimento(): void {
    this.areaConhecimentoService.getAll()
      .subscribe((response: ApiResponse) => {
        this.areasDeConhecimento = response.resultado;
      }, error =>
        console.log("Erro na obtenção das áreas de conhecimento - Pesquisa!"));
  }

  getDisciplinas(): void {
    this.disciplinesService.getAll()
      .subscribe((response: ApiResponse) => {
        this.disciplinas = response.resultado;
      }, error =>
        console.log("Erro na obtenção das disciplinas - Pesquisa!"));
  }

  onQuestionNew() {
    this.questionNew.emit();
  }

  onFormSubmitted() {
    this.submitted.emit(this.searchForm.value);
  }

}
