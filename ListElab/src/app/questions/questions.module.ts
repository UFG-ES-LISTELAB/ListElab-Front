import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { QuestionsComponent } from './questions.component';
import { SearchQuestionsComponent } from './search-questions/search-questions.component';


@NgModule({
  declarations: [
    QuestionsComponent,
    SearchQuestionsComponent
  ],
  imports: [
    CommonModule,

    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class QuestionsModule { }
