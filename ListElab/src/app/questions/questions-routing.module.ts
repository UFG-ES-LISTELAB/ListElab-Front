import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {QuestionsComponent} from './questions.component';
import {QuestionsNewComponent} from './pages/questions-new/questions-new.component';
import {QuestionsListComponent} from './pages/questions-list/questions-list.component';


const routes: Routes = [
  { path: '', component: QuestionsComponent, children: [
      { path: '', component: QuestionsListComponent },
      { path: 'new', component: QuestionsNewComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
