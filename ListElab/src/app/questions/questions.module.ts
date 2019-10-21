import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { QuestionsRoutingModule } from './questions-routing.module';

import { QuestionsComponent } from './questions.component';

import { QuestionsSearchComponent } from './shared/questions-search/questions-search.component';
import { QuestionsFormComponent } from './questions-form/questions-form.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionsCardComponent } from './shared/questions-card/questions-card.component';


@NgModule({
  declarations: [
    QuestionsSearchComponent,
    QuestionsComponent,
    QuestionsFormComponent,
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
