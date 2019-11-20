import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ToolbarComponent} from './components/toolbar/toolbar.component';

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
  MatTooltipModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatAutocompleteModule
} from '@angular/material';

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
  MatTooltipModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatAutocompleteModule
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
export class SharedModule {
}
