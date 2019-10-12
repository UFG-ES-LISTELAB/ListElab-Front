import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { QuestionsRoutingModule } from './questions-routing.module';

import { QuestionsComponent } from './questions.component';

import { SearchQuestionsComponent } from './components/search-questions/search-questions.component';
import { QuestionsNewComponent } from './pages/questions-new/questions-new.component';
import { QuestionsListComponent } from './pages/questions-list/questions-list.component';


@NgModule({
  declarations: [
    SearchQuestionsComponent,
    QuestionsComponent,
    QuestionsNewComponent,
    QuestionsListComponent,
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class QuestionsModule { }
