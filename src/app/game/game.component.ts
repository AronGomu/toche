import { Component, OnInit } from '@angular/core';
import { GameInfo } from '../classes/gameInfo';
import { GlobalVariables } from '../services/globalVariables';

import { Player } from './game.classes/Player';
import { Deck } from '../classes/deck';
import { Field } from './game.classes/Field';
import { SocketioService } from '../services/socketio.service';
import { User } from '../classes/user';
import { Card } from '../classes/card';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public myself: User;
  public opponent: User;
  public gameInfo: GameInfo;
  public myDeck: Deck;

  constructor(public globalVariables: GlobalVariables,  private socketService: SocketioService) {

    if (globalVariables.myself == null) {
      this.myself = new User("Spikey",null,true,true);
      this.opponent = new User("Johnson",null,true,true);
      this.gameInfo = new GameInfo(this.myself,this.opponent,true,false,"Spikey & Johnson game",true);
      let decklist: Card[] = [];
      for (let i = 0; i < 6; i++) {
        let card = new Card("testId" + i,"testColor" + i,"testFaction" + i,"testName" + i,"testManacost" + i,["testType" + i],["testArchetype" + i],["testSubtype" + i],1000,1,null);
        decklist.push(card);
      }
      this.myDeck = new Deck(this.myself.username + " Deck",this.opponent.username + " Deck",decklist,true);
    } else {
      this.myself = new User("Johnson",null,true,true);
      this.opponent = new User("Spikey",null,true,true);
      this.gameInfo = new GameInfo(this.myself,this.opponent,true,false,"Spikey & Johnson game",true);
      let decklist: Card[] = [];
      for (let i = 0; i < 6; i++) {
        let card = new Card("testId" + i,"testColor" + i,"testFaction" + i,"testName" + i,"testManacost" + i,["testType" + i],["testArchetype" + i],["testSubtype" + i],1000,1,null);
        decklist.push(card);
      }
      this.myDeck = new Deck(this.myself.username + " Deck",this.opponent.username + " Deck",decklist,true);
    }

    /*
    this.gameInfo = this.globalVariables.gameInfo;
    this.myDeck = globalVariables.currentDeck;
    this.myself = this.globalVariables.myself;
    if (this.gameInfo.isCreator == true) {
      this.opponent = this.gameInfo.roomJoiner;
    } else {
      this.opponent = this.gameInfo.roomCreator;
    }
    */
  }

  ngOnInit(): void {
    let data = {
      'myself': this.myself,
      'opponent' : this.opponent,
      'gameInfo': this.gameInfo,
      'deck': this.myDeck,
    }
    this.socketService.socket.emit('initializeGame',data);
  }

}
