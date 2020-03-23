import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

import { GlobalVariables } from '../services/globalVariables';

import { Deck } from '../classes/deck';
import { SocketioService } from '../services/socketio.service';

@Component({
  selector: 'app-configgame',
  templateUrl: './configgame.component.html',
  styleUrls: ['./configgame.component.scss']
})
export class ConfiggameComponent implements OnInit {

  public allDecks: Deck[];

  public deckJson: Deck;

  public infoRoom = {
    'roomCreator': null,
    'roomJoiner': null,
    'isCreator' : null,
    'isPrivate' : null,
    'socketRoomName': null,
  }


  constructor(private _http: HttpClient, private _router: Router, private globalVariables: GlobalVariables,  private socketioService: SocketioService) {
    // Check if user is connected, redirect to login page if not
    if (this.globalVariables.myself == null) {
      this._router.navigate(['login'], {replaceUrl: true});
      return;
    }
    
  }

  ngOnInit(): void {
    this.getDecks();

    if (this.globalVariables.gameCreatorInitializer != null) {

      this.infoRoom = this.globalVariables.gameCreatorInitializer

      // If the user is the creator of the room
      if (this.infoRoom.isCreator == true) {
        // If there is an already choosed joiner
        if (this.infoRoom.roomJoiner != null) {
          this.infoRoom.socketRoomName = this.infoRoom.roomCreator.username + " and " + this.infoRoom.roomJoiner.username + " game."
          this.socketioService.socket.emit('joinRoom', this.infoRoom);
        }

        // If there is no already choosed joiner
        else {
        }
      }

      // If the user is the joiner
      else if (this.infoRoom.isCreator == false) {

        this.socketioService.socket.emit('roomJoined', this.infoRoom.socketRoomName);
      }
    }
  }

  getDecks() {
    this._http.post<any>(this.globalVariables.apiURL + '/getDecks', null).subscribe((res) => {});
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
    this.globalVariables.currentDeck = this.deckJson;
    this._router.navigate(['game']);

  }

  debug() {
    console.log(this.deckJson);
    console.log(this.allDecks);
    console.log(this.infoRoom);
  }

}
