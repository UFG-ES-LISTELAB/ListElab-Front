import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {QUESTOES_LISTAR} from '../../../shared/constants/routes.contants';

@Component({
  selector: 'app-questions-new',
  templateUrl: './questions-new.component.html',
  styleUrls: ['./questions-new.component.scss']
})
export class QuestionsNewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  handleReturnList() {
    this.router.navigate([QUESTOES_LISTAR]);
  }
}
