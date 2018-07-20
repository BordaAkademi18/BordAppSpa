import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { AppRouterModule } from './app-router.module';

import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { EventComponent } from './event/event.component';
import { WishboxComponent } from './wishbox/wishbox.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MainComponent,
    PageNotFoundComponent,
    LoginComponent,
    LogoutComponent,
    EventComponent,
    WishboxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
