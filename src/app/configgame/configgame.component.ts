import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

import { GlobalConstants } from './../common/global-constant';

@Component({
  selector: 'app-configgame',
  templateUrl: './configgame.component.html',
  styleUrls: ['./configgame.component.scss']
})
export class ConfiggameComponent implements OnInit {

  public allDecks;

  public deckJson;

  constructor(private _http: HttpClient, private _router: Router) {
    // Check if user is connected, redirect to login page if not
    if (GlobalConstants.username == null) {
      this._router.navigate(['login'], {replaceUrl: true});
      return;
    }

    this.getDecks();

  }

  ngOnInit(): void {
  }

  getDecks() {
    this._http.get<any>(GlobalConstants.apiURL + '/getDecks').subscribe((res) => {
      console.log("Response getDecks : ");
      console.log(res);
      this.followingGetDecks(res)});
  }

  followingGetDecks(res) {
    this.allDecks = res.decks;
    if (this.allDecks.length > 0) {
      //this.defineSelectedForAllDecks();
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

}
