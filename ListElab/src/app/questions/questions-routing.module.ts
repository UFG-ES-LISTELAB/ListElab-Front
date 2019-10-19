import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {QuestionsComponent} from './questions.component';
import {QuestionsFormComponent} from './questions-form/questions-form.component';
import {QuestionsListComponent} from './questions-list/questions-list.component';
import {QUESTOES_LISTAR, ROUTES} from '../shared/constants/routes.contants';


const routes: Routes = [
  { path: '', component: QuestionsComponent, children: [
      { path: `${ROUTES.questoes.listar}`, component: QuestionsListComponent },
      { path: `${ROUTES.questoes.criar}`, component: QuestionsFormComponent },
      { path: `${ROUTES.questoes.editar}`, component: QuestionsFormComponent },
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
