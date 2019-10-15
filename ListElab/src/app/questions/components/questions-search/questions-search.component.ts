import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {QUESTOES_CRIAR} from '../../../shared/constants/routes.contants';

@Component({
  selector: 'app-questions-search',
  templateUrl: './questions-search.component.html',
  styleUrls: ['./questions-search.component.scss']
})
export class QuestionsSearchComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  handleGoNovaQuestao() {
    this.router.navigate([QUESTOES_CRIAR]);
  }
}
