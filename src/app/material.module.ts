import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCheckboxModule,
  MatGridListModule,
  MatInputModule,
  MatCardModule,
  MatMenuModule,
  MatTooltipModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule(
  {
    imports: [
      LayoutModule,
      MatToolbarModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatButtonModule,
      MatCheckboxModule,
      MatGridListModule,
      MatInputModule,
      MatCardModule,
      MatMenuModule,
      MatTooltipModule,
      MatSnackBarModule
    ],
    exports: [
      LayoutModule,
      MatToolbarModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatButtonModule,
      MatCheckboxModule,
      MatGridListModule,
      MatInputModule,
      MatCardModule,
      MatMenuModule,
      MatTooltipModule,
      MatSnackBarModule
    ],
  }
)
export class MaterialModule { }
