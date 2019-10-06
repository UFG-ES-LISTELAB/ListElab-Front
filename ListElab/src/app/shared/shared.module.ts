import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule
} from '@angular/material';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    MatToolbarModule,
    ...MATERIAL_MODULES
  ]
})
export class SharedModule { }
