import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { DeckbuilderComponent } from './deckbuilder/deckbuilder.component';
import { ConfiggameComponent } from './configgame/configgame.component'
import { GameComponent } from './game/game.component'
import { Game2Component } from './game2/game2.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {path: '', redirectTo: '/menu', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'deckbuilder', component: DeckbuilderComponent},
  {path: 'configgame', component: ConfiggameComponent},
  {path: 'game', component: GameComponent},
  {path: 'game2', component: Game2Component},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, RegisterComponent, MenuComponent, DeckbuilderComponent,ConfiggameComponent, GameComponent, Game2Component, PageNotFoundComponent];
