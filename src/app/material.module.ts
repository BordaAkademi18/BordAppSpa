import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, 
  MatButtonModule, 
  MatSidenavModule, 
  MatIconModule, 
  MatListModule, 
  MatCheckboxModule,
  MatGridListModule,
  MatInputModule } from '@angular/material';

@NgModule(
  {
  imports: [
    MatButtonModule, 
    MatCheckboxModule
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
    MatInputModule
  ],
}
)
export class MaterialModule { }
