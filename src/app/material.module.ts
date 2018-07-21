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
  MatSnackBarModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDividerModule,
  MatChipsModule,
  MatAutocompleteModule
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
      MatSnackBarModule,
      MatExpansionModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatDividerModule,
      MatChipsModule,
      MatAutocompleteModule
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
      MatSnackBarModule,
      MatExpansionModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatDividerModule,
      MatChipsModule,
      MatAutocompleteModule
    ],
  }
)
export class MaterialModule { }
