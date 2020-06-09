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

  public TestCardName: string = "Test Maboi le Monstrueux";

  public cardToPreview;

  // img sizes data
  private originalCardHeight: number = 1047;
  private originalCardWidth: number = 747;

  public cardPreviewHeight: number = this.originalCardHeight/2;
  public cardPreviewWidth: number = this.originalCardWidth/2;

  public cardNamePaddingBottomPreview: number = this.cardPreviewHeight/100*4;
  public cardNamePaddingRightPreview: number = this.cardPreviewWidth/100*25;
  
2
  public imgHeight: number;
  public imgWidth: number;

  public cardHeight: number;
  public cardWidth: number;

  public cardNamePaddingRight: number;
  public cardNamePaddingBottom: number;

  // img hover
  public isHover: boolean = false;
  public xPosMouse: number;
  public yPosMouse: number;
  public imgUrl: string;


  // TEST FUNCTIONS

  private deckCreator() {
    let deck: number[] = [];
    for (let i = 0; i < 15; i++) {
      deck.push(0);
    }

    let extraDeck: number[] = [];
    for (let i = 0; i < 15; i++) {
      extraDeck.push(0);
    }

    let sideDeck: number[] = [];
    for (let i = 0; i < 15; i++) {
      sideDeck.push(0);
    }

    let decks = {
      "deck": deck,
      "extraDeck": deck,
      "sideDeck": sideDeck
    }

    console.log(decks);

    return decks;
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

    console.log("cardHeight :" + this.cardHeight);
    console.log("cardWidth :" + this.cardWidth);
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
    this.socketService.socket.on("fetchGameStateReceiver", (data) => {
      console.log("Receive fetchGameState");console.log(data);
      this.game.setGameState(data);
      console.log("ma hand");
      console.log(this.game.me.hand);
    });
  }

  passPriorityReceiver() {
    this.socketService.socket.on("passPriorityReceiver", (data) => {
      console.log("Receive passPriorityReceiver");
      this.socketService.socket.emit("fetchGameState", this.game.getDataForSocketConnexion());
    });
  }

  playCardReceiver() {
    this.socketService.socket.on("playCardReceiver", (data) => {
      console.log("Receive playCardReceiver");console.log(data);
      this.socketService.socket.emit("fetchGameStateToPayCost", this.game.getDataForSocketConnexion());
      this.game.costToExploit = data;
    });
  }

  fetchGameStateToPayCostReceiver() {
    this.socketService.socket.on("fetchGameStateToPayCostReceiver", (data) => {
      console.log("Receive fetchGameStateToPayCostReceiver");console.log(data);
      this.game.setGameState(data);
      this.game.payCost();
    });
  }

  resolvePayCostReceiver() {
    this.socketService.socket.on("resolvePayCostReceiver", (data) => {
      console.log("Receive resolvePayCostReceiver");console.log(data);
      this.socketService.socket.emit("passPriority", this.game.getDataForSocketConnexion());
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
    this.playCardReceiver();
    this.fetchGameStateToPayCostReceiver();
    this.resolvePayCostReceiver();

  }

  setImgSize() {
    this.imgHeight = window.innerHeight/6;
    this.imgWidth = (this.imgHeight * this.originalCardWidth) / this.originalCardHeight;

    this.cardHeight = window.innerHeight/6;
    this.cardWidth = (this.cardHeight * this.originalCardWidth) / this.originalCardHeight;

    this.cardNamePaddingRight = this.cardWidth/100*25;
    this.cardNamePaddingBottom = this.cardHeight/100*5;

  }

  onResize(event){
    this.setImgSize();
  }

  mouseEnterCardImg(event, cardInGameId: number) {
    this.cardToPreview = this.game.getCardFromInGameId(cardInGameId);
    this.xPosMouse = <number><unknown>event.clientX + this.cardWidth;
    let test: number = <number><unknown>this.xPosMouse;
    if (this.xPosMouse > window.innerWidth - this.originalCardWidth) {
      this.xPosMouse = window.innerWidth - this.originalCardWidth;
    }
    this.yPosMouse = <number><unknown>event.clientY;
    if (this.yPosMouse > window.innerHeight - this.cardPreviewHeight) {
      this.yPosMouse = window.innerHeight - this.cardPreviewHeight;
      if (this.yPosMouse < 0 ) {
        //this.yPosMouse = 0;
      }
    }
    this.imgUrl = event.target.currentSrc;
    this.isHover = true;
  }

  mouseLeaveCardImg(event, cardId: number) {
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

  passTurn() {
    console.log("passTurn")
    this.game.me.havePriority = false;
    this.game.opponent.havePriority = true;
    this.socketService.socket.emit("passTurn", this.game.getDataForSocketConnexion());
  }

  playCard(event) {
    console.log("PLAY CARD");
    console.log(event.target.id);
    console.log(this.game.getCardFromInGameId(event.target.id));
    this.socketService.socket.emit("playCard", this.game.getDataForSocketConnexionWithinGameId(event.target.id));
    this.game.allCards.forEach(card => {
      card.playableBool = false;
    });
  }

  
  selectCard(event) {
    console.log("CARD SELECTED");
    console.log(event.target.id);
    this.game.setCardsSelectedForCost(event.target.id);
    if (this.game.payCost() === true) {
      this.socketService.socket.emit("payCost", this.game.getDataForSocketConnexionWithcardsSelected());
    }
  }

  selectFromField(event) {

  }

  unselectFromField(event) {

  }
  

  showMyDeck(event) {}

  showMyExtraDeck(event) {}

  showMyGraveyard(event) {}

  showMyExile(event) {}

  showOpponentDeck(event) {}
  
  showOpponentExtraDeck(event) {}

  showOpponentGraveyard(event) {}

  showOpponentExile(event) {}

}
