import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ROUTES} from '../shared/constants/routes.contants';
import {ListsComponent} from './lists.component';
import {ListsListComponent} from './lists-list/lists-list.component';
import {ListsFormComponent} from './lists-form/lists-form.component';

const routes: Routes = [
    {
        path: '', component: ListsComponent, children: [
            {path: '', component: ListsListComponent, pathMatch: 'full'},
            {path: `${ROUTES.listas.form}/:id`, component: ListsFormComponent},
            {path: `${ROUTES.listas.form}`, component: ListsFormComponent},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListsRoutingModule { }
