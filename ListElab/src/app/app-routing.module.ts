import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ROUTES} from './shared/constants/routes.contants';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'questions'
  },
  {
    path: ROUTES.login.base,
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: ROUTES.questoes.base,
    loadChildren: () => import('./questions/questions.module').then(m => m.QuestionsModule)
  },
  // {
  //   path: '**',
  //   redirectTo: ''
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
