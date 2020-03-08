import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Angular Addons
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// routing
import { AppRoutingModule, routingComponents } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfiggameComponent } from './configgame/configgame.component';

// Custom Services
import {SocketioService} from './services/socketio.service';


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
  providers: [SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
