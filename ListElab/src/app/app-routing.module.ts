import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuestionsComponent} from './questions/questions.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'questions',
    pathMatch: 'full'
  },
  {
    path: 'questions',
    component: QuestionsComponent
  }
  // {
  //   path: 'questions',
  //   loadChildren: () => import('./questions/questions.module').then(m => m.QuestionsModule)
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
