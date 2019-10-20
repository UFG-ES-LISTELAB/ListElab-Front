import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatMenuModule,
  MatSelectModule,
  MatOptionModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTooltipModule
} from '@angular/material';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatMenuModule,
  MatSelectModule,
  MatOptionModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTooltipModule
];

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    MatToolbarModule,
    ...MATERIAL_MODULES,
    ToolbarComponent
  ]
})
export class SharedModule { }
