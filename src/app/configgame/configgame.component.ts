import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

import { GlobalVariables } from '../services/globalVariables';

import { Deck } from '../classes/Deck';
import { SocketioService } from '../services/socketio.service';
import { GameInfo } from '../classes/gameInfo';

@Component({
  selector: 'app-configgame',
  templateUrl: './configgame.component.html',
  styleUrls: ['./configgame.component.scss']
})
export class ConfiggameComponent implements OnInit {

  public allDecks: Deck[];

  public deckJson: Deck;

  public infoRoom: GameInfo;

  public isReady: boolean = false;


  constructor(private _http: HttpClient, private _router: Router, private globalVariables: GlobalVariables,  private socketService: SocketioService) {
    // Check if user is connected, redirect to login page if not
    if (this.globalVariables.myself == null) {
      this._router.navigate(['login'], {replaceUrl: true});
      return;
    }
  }

  changeIsReadyReceiver() {
    this.socketService.socket.on('changeReady', (data) => {
      console.log("Receive changeIsReady");console.log(data);console.log("");
      this.isReady = data.isReady;
    })
  }

  startGameReceiver() {
    this.socketService.socket.on('startGame', (data) => {
      console.log("Receive startGame");console.log(data);console.log("");
      this.globalVariables.currentDeck = this.deckJson;
      this.infoRoom.isStarted = true;
      this.globalVariables.gameInfo = this.infoRoom;
      this._router.navigate(['game']);
    })
  }

  ngOnInit(): void {
    this.getDecks();

    if (this.globalVariables.gameInfo != null) {

      this.infoRoom = this.globalVariables.gameInfo

      // If the user is the creator of the room
      if (this.infoRoom.isCreator == true) {
        // If there is an already choosed joiner
        if (this.infoRoom.roomJoiner != null) {
          this.infoRoom.socketRoomName = this.infoRoom.roomCreator.username + " and " + this.infoRoom.roomJoiner.username + " game."
          this.socketService.socket.emit('joinRoom', this.infoRoom);
        }

        // If there is no already choosed joiner
        else {
        }
      }

      // If the user is the joiner
      else if (this.infoRoom.isCreator == false) {
        this.socketService.socket.emit('roomJoined', this.infoRoom.socketRoomName);
      }
    }
    // Launch all receiver
    this.changeIsReadyReceiver();
    this.startGameReceiver();
  }

  getDecks() {
    this._http.post<any>(this.globalVariables.apiURL + '/getDecks', null).subscribe((res) => {this.followingGetDecks(res)});
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
    let data = {
      'infoRoom' : this.infoRoom,
    }
    this.socketService.socket.emit('startGame',data);
  }

  changeReady() {
    this.isReady = !this.isReady
    console.log(this.isReady);

    let data = {
      'infoRoom' : this.infoRoom,
      'isReady' : this.isReady
    }

    this.socketService.socket.emit('changeReady',data);
  }

  debug() {
    console.log(this.deckJson);
    console.log(this.allDecks);
    console.log(this.infoRoom);
    this.isReady = true;
  }

}
