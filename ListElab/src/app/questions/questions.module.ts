import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './questions.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [QuestionsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class QuestionsModule { }
