import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { QuestionsRoutingModule } from './questions-routing.module';

import { QuestionsComponent } from './questions.component';

import { QuestionsSearchComponent } from './components/questions-search/questions-search.component';
import { QuestionsNewComponent } from './pages/questions-new/questions-new.component';
import { QuestionsListComponent } from './pages/questions-list/questions-list.component';
import { QuestionsCardComponent } from './components/questions-card/questions-card.component';


@NgModule({
  declarations: [
    QuestionsSearchComponent,
    QuestionsComponent,
    QuestionsNewComponent,
    QuestionsListComponent,
    QuestionsCardComponent,
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class QuestionsModule { }
