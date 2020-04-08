import { Component, OnInit } from '@angular/core';

import { GlobalVariables } from '../services/globalVariables';

import { SocketioService } from '../services/socketio.service';
import { User } from '../classes/user';

import { GameInfo } from '../classes/gameInfo';
import { Deck } from '../classes/deck';
import { Card } from '../classes/card';

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


  // Game Data
  public myself: User;
  public opponent: User;
  public gameInfo: GameInfo;
  public myDeck: Deck;

  public me = {
    "deck" : [],
    "hand" : [],
  }

  public opp = {
    "deck" : [],
    "hand" : [],
  }

  constructor(public globalVariables: GlobalVariables,  private socketService: SocketioService) {

    // TEST INITIALIZER
    if (globalVariables.myself == null) {
      this.myself = new User("Spikey",null,true,true);
      this.opponent = new User("Johnson",null,true,true);
      this.gameInfo = new GameInfo(this.myself,this.opponent,true,false,"Spikey & Johnson game",true);
      let decklist: Card[] = [];
      for (let i = 0; i < 6; i++) {
        let card = new Card("testId" + i,"testColor" + i,"testFaction" + i,"testName" + i,"testManacost" + i,["testType" + i],["testArchetype" + i],["testSubtype" + i],1000,1,"test" + i + ".jpg");
        decklist.push(card);
      }
      this.myDeck = new Deck(this.myself.username + " Deck",this.opponent.username + " Deck",decklist,true);
    } else {
      this.myself = new User("Johnson",null,true,true);
      this.opponent = new User("Spikey",null,true,true);
      this.gameInfo = new GameInfo(this.myself,this.opponent,true,false,"Spikey & Johnson game",true);
      let decklist: Card[] = [];
      for (let i = 0; i < 6; i++) {
        let card = new Card("testId" + i,"testColor" + i,"testFaction" + i,"testName" + i,"testManacost" + i,["testType" + i],["testArchetype" + i],["testSubtype" + i],1000,1,"test" + i + ".jpg");
        decklist.push(card);
      }
      this.myDeck = new Deck(this.myself.username + " Deck",this.opponent.username + " Deck",decklist,true);
    }

    /* DONT DELETE, REAL INITIALIZER
    this.gameInfo = this.globalVariables.gameInfo;
    this.myDeck = globalVariables.currentDeck;
    this.myself = this.globalVariables.myself;
    if (this.gameInfo.isCreator == true) {
      this.opponent = this.gameInfo.roomJoiner;
    } else {
      this.opponent = this.gameInfo.roomCreator;
    }
    */

    this.setImgSize();

    console.log("cardbackHeight :" + this.cardbackHeight);
    console.log("cardbackWidth :" + this.cardbackWidth);
  }

  // Receivers

  setSocketIdReceiver() {
    this.socketService.socket.on("setSocketId", (data) => {
      console.log("Receive setSocketId");
      this.myself.socketId = data;
      this.socketService.socket.emit("initializeGame", {"myself": this.myself,"opponent": this.opponent,"gameInfo": this.gameInfo,"myDeck": this.myDeck});
    })
  }

  initializeGameReceiver() {
    // Data should be a socket.Id
    this.socketService.socket.on("initializeGame", () => {
      console.log("Receive initializeGame");
      console.log(this.gameInfo.socketRoomName);
      this.socketService.socket.emit("fetchGameState", {"myself": this.myself,"opponent": this.opponent,"gameInfo": this.gameInfo,"myDeck": this.myDeck});
    })
  }

  fetchGameStateReceiver() {
    this.socketService.socket.on("fetchGameState", (data) => {
      console.log("Receive fetchGameState");console.log(data);
      this.me.deck = data.myDeckArray;
      this.me.hand = data.myHandArray;
      this.opp.deck = data.oppDeckArray;
      this.opp.hand = data.oppHandArray;
      console.log("this.me.hand");
      console.log(this.me.hand);
    })
  }

  // On start

  ngOnInit(): void {
    this.socketService.socket.emit("setSocketId", {"myself": this.myself,"opponent": this.opponent,"gameInfo": this.gameInfo,"myDeck": this.myDeck});
    this.setSocketIdReceiver();
    this.initializeGameReceiver();
    this.fetchGameStateReceiver();

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
    console.log(event);
    this.xPosMouse = event.clientX;
    this.yPosMouse = event.clientY;
    this.imgUrl = event.target.currentSrc;
    this.isHover = true;

  }

  mouseLeaveCardImg(event) {
    console.log(event);
    this.isHover = false;
    this.imgUrl = null;
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
