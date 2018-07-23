import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { AppRouterModule } from './app-router.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { EventComponent } from './event/event.component';
import { WishboxComponent } from './wishbox/wishbox.component';
import { ThemePickerModule } from './theme-picker';

import { StyleManager } from './style-manager';
import { SearchQueryService } from './event/search-query.service';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MainComponent,
    PageNotFoundComponent,
    LoginComponent,
    EventComponent,
    WishboxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AppRouterModule,
    ReactiveFormsModule,
    ThemePickerModule,
    HttpClientModule    
  ],
  providers: [StyleManager, SearchQueryService],  
  bootstrap: [AppComponent]
})
export class AppModule { }
