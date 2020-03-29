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
import { SocketioService } from './services/socketio.service';
import { GlobalVariables } from './services/globalVariables';
import { GlobalFunctions } from './services/globalFunctions';
import { UserlistComponent } from './userlist/userlist.component';
import { Game2Component } from './game2/game2.component';



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
    UserlistComponent,
    Game2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [SocketioService, GlobalVariables, GlobalFunctions],
  bootstrap: [AppComponent]
})
export class AppModule { }
