import { Component, OnInit } from '@angular/core';

import { GlobalVariables } from '../services/globalVariables';

import { SocketioService } from '../services/socketio.service';
import { User } from '../classes/user';

import { GameInfo } from '../classes/gameInfo';
import { Deck } from '../classes/deck';
import { Card } from '../classes/card';
import { Game } from './game.classes/Game';

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class GameComponent implements OnInit {

  public game: Game;

  // img sizes data
  private originalImgHeight: number = 616;
  private originalImgWidth: number = 449;
  
  private originalCardbackHeight: number = 703;
  private originalCardbackWidth: number = 502;

  public imgHeight: number;
  public imgWidth: number;

  public cardbackHeight: number;
  public cardbackWidth: number;

  // img hover
  public isHover: boolean = false;
  public xPosMouse: Position;
  public yPosMouse: Position;
  public imgUrl: string;


  // TEST FUNCTIONS

  private deckCreator() {
    let decklist: Deck = new Deck("test", "test", [], false);
    for (let i = 0; i < 6; i++) {
      let card = new Card("testId" + i,"testColor" + i,"testFaction" + i,"testName" + i,"testManacost" + i,["testType" + i],["testArchetype" + i],["testSubtype" + i],1000,1,"test" + i + ".jpg");
      decklist.cards.push(card);
    }
    return decklist;
  }


  constructor(public globalVariables: GlobalVariables,  private socketService: SocketioService) {

    // TEST INITIALIZER
    if (globalVariables.myself == null) {
      let myself = new User("Spikey",null,true,true);
      let opponent = new User("Johnson",null,true,true);
      let gameInfo = new GameInfo(myself,opponent,true,false,"Spikey & Johnson game",true);
      this.game = new Game(myself,opponent,gameInfo);
      console.log("INIT");
      console.log(this.game.opponentUser);
    } else {
      let myself = new User("Johnson",null,true,true);
      let opponent = new User("Spikey",null,true,true);
      let gameInfo = new GameInfo(myself,opponent,true,false,"Spikey & Johnson game",true);
      this.game = new Game(myself,opponent,gameInfo);
    }
    

     // DONT DELETE, REAL INITIALIZER
     /*
    let gameInfo = this.globalVariables.gameInfo;
    let opponent;
    if (gameInfo.isCreator == true) {
      opponent = gameInfo.roomJoiner;
    } else {
      opponent = gameInfo.roomCreator;
    }
    this.game = new Game(this.globalVariables.myself,opponent,this.globalVariables.gameInfo);
    */
    

    this.setImgSize();

    console.log("cardbackHeight :" + this.cardbackHeight);
    console.log("cardbackWidth :" + this.cardbackWidth);
  }

  // Receivers

  setSocketIdReceiver() {
    this.socketService.socket.on("setSocketId", (data) => {
      console.log("Receive setSocketId");console.log(data);
      this.game.myselfUser.socketId = data.mySocketId;
      if (data.oppSocketId != null) {
        this.game.opponentUser.socketId = data.oppSocketId;
        this.socketService.socket.emit("setOppSocketId", this.game.getDataForSocketConnexion());
        this.socketService.socket.emit("initializeGame",this.game.getDataForSocketConnexionWithDeck(this.deckCreator()));
      }
    });
  }

  setOppSocketIdReceiver() {
    this.socketService.socket.on("setOppSocketIdReceiver", (data) => {
      console.log("Receive setOppSocketIdReceiver");console.log(data);
      this.game.opponentUser.socketId = data.oppSocketId;
      this.socketService.socket.emit("initializeGame",this.game.getDataForSocketConnexionWithDeck(this.deckCreator()));
    });
  }

  initializeGameReceiver() {
    // Data should be a socket.Id
    this.socketService.socket.on("initializeGameReceiver", () => {
      console.log("Receive initializeGameReceiver");
      this.socketService.socket.emit("fetchGameState", this.game.getDataForSocketConnexion());
    });
  }

  fetchGameStateReceiver() {
    this.socketService.socket.on("fetchGameState", (data) => {
      console.log("Receive fetchGameState");console.log(data);

      this.game.turn.setCurrentPhase(data.currentPhaseString);
      this.game.turn.activePlayer = this.game.getPlayerByName(data.activePlayerUsernameString);

      this.game.me.haveTurn = data.haveTurnBool;
      this.game.me.havePriority = data.havePriorityBool;
      this.game.isStackEmpty = data.isStackEmptyBool;

      this.game.me.deck = data.myDeckArray;
      this.game.me.hand = data.myHandArray;

      this.game.opponent.deck = data.oppDeckArray;
      this.game.opponent.hand = data.oppHandArray;
    });
  }

  passPriorityReceiver() {
    this.socketService.socket.on("passPriorityReceiver", (data) => {
      console.log("Receive passPriorityReceiver");
      this.socketService.socket.emit("fetchGameState", this.game.getDataForSocketConnexion());
      
      /*
      if (this.game.isStackEmpty == true && this.game.turn.activePlayer.username == this.game.me.username) {
        this.game.turn.nextPhase();
      }
      else {
        this.game.me.havePriority = true;
        this.game.opponent.havePriority = false;
      }
      */
    });
    

  }

  // On start

  ngOnInit(): void {
    this.socketService.socket.emit("setSocketId", this.game.getDataForSocketConnexion());
    this.setSocketIdReceiver();
    this.initializeGameReceiver();
    this.fetchGameStateReceiver();
    this.passPriorityReceiver();
    this.setOppSocketIdReceiver();

  }

  setImgSize() {
    this.imgHeight = window.innerHeight/6;
    this.imgWidth = (this.imgHeight * this.originalImgWidth) / this.originalImgHeight;

    this.cardbackHeight = window.innerHeight/6;
    this.cardbackWidth = (this.cardbackHeight * this.originalCardbackWidth) / this.originalCardbackHeight;
  }

  onResize(event){
    this.setImgSize();
  }

  mouseEnterCardImg(event) {
    this.xPosMouse = event.clientX + this.cardbackWidth;
    this.yPosMouse = event.clientY;
    this.imgUrl = event.target.currentSrc;
    this.isHover = true;
  }

  mouseLeaveCardImg(event) {
    this.isHover = false;
    this.imgUrl = null;
  }

  getPriority() {

  }

  passPriority() {
    console.log("passPriority")
    this.game.me.havePriority = false;
    this.game.opponent.havePriority = true;
    this.socketService.socket.emit("passPriority", this.game.getDataForSocketConnexion());
  }

  playCard(event) {
    console.log(event.target.id);
    // get the id, find the card, execute the code
  }

  setCardHover(event) {
    /*
    console.log(event);
    if (this.isHover == true) {
      console.log("event.screenX : " + event.screenX + " & event.screenY : " + event.screenY);
      this.xPosMouse = event.screenX;
      this.yPosMouse = event.screenY;
    }
    */
  }

}
