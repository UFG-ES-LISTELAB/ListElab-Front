import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { QuestionsRoutingModule } from './questions-routing.module';

import { QuestionsComponent } from './questions.component';

import { QuestionsSearchComponent } from './components/questions-search/questions-search.component';
import { QuestionsFormComponent } from './questions-form/questions-form.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionsCardComponent } from './components/questions-card/questions-card.component';
import {ListsModule} from "../lists/lists.module";


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
    ListsModule,
  ]
})
export class QuestionsModule { }
