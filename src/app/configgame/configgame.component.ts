import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

import { GlobalConstants } from './../common/global-constant';

import { Deck } from './../common/deck';

@Component({
  selector: 'app-configgame',
  templateUrl: './configgame.component.html',
  styleUrls: ['./configgame.component.scss']
})
export class ConfiggameComponent implements OnInit {

  public allDecks: Deck[];

  public deckJson: Deck;
  constructor(private _http: HttpClient, private _router: Router) {
    // Check if user is connected, redirect to login page if not
    /* Temporary
    if (GlobalConstants.username == null) {
      this._router.navigate(['login'], {replaceUrl: true});
      return;
    }
    */
  }

  ngOnInit(): void {
    this.getDecks();
  }

  getDecks() {
    this._http.post<any>(GlobalConstants.apiURL + '/getDecks', null).subscribe((res) => {
      console.log("Response getDecks : ");
      console.log(res);
      this.followingGetDecks(res)});
  }

  followingGetDecks(res) {
    this.deckJson = res.currentDeck;
    this.allDecks = res.decks;
    if (this.allDecks.length > 0) {
      this.allDecks.forEach(element => {
        if (element.name == this.deckJson.name) {
          element.selected = true;
        }
        else {
          element.selected = false;
        }
      });
    }
  }

  deckSelected(event) {
    for (let i = 0; i < this.allDecks.length; i++) {
      if (this.allDecks[i].name == event.target.value) {
        this.deckJson = this.allDecks[i];
        break;
      } 
    }
  }

  startGame() {
    GlobalConstants.currentDeck = this.deckJson;
    this._router.navigate(['game']);

  }

  debug() {
    console.log(this.deckJson);
    console.log(this.allDecks);
  }

}
