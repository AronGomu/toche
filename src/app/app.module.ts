import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfiggameComponent } from './configgame/configgame.component';

import { API } from './common/api';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MenuComponent,
    PageNotFoundComponent,
    GameComponent,
    LoginComponent,
    RegisterComponent,
    ConfiggameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [API],
  bootstrap: [AppComponent]
})
export class AppModule { }
