import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { GlobalVariables } from '../services/globalVariables';
import { GlobalFunctions } from '../services/globalFunctions';
import { SocketioService } from './../services/socketio.service';
import { User } from '../classes/user';
import { GameInfo } from '../classes/gameInfo';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {


  public myself: User;
  public userlist = null;

  challengeAsker: User;



  constructor(public globalVariables: GlobalVariables, private globalFunctions: GlobalFunctions,  private socketService: SocketioService, private _router: Router) {}

  public onLogin():  void {


    this.socketService.socket.on('user_did_login',(data) => {

      if (this.globalVariables.myself == null) {
        return;
      }

      console.log("Receive user_did_login");console.log(data.myself);console.log(data.userlist);console.log("");

      if (this.globalVariables.myself.username == data.myself.username) {
        this.globalVariables.setMyself(data.myself);
      }
      
      this.globalVariables.setConnectedUsers(data.userlist);

      this.myself = this.globalVariables.myself;
      this.userlist = [...this.globalVariables.connectedUsers];
      

      for (let i = 0; i < this.userlist.length; i++) {
        if (this.userlist[i].username == this.globalVariables.myself.username) {
          this.userlist.splice(i,1);
        }
      }
      this._router.navigate(['menu']);
    })
  }

  gotChallengePropositionReceiver() {
    this.socketService.socket.on('gotChallengeProposition', (data) => {
      console.log("Receive gotChallengeProposition");console.log(data);console.log("");
      this.challengeAsker = data.userAsking;
      this.myself.isInGame = true;
    })
  }

  challengePropositionResponseReceiver() {
    this.socketService.socket.on('challengePropositionResponse', (data) => {
      console.log("Receive challengePropositionResponse");console.log(data);console.log("");

      if (data.accept == true) {
        this.socketService.socket.emit('refreshConnectedUserList');
        this.globalVariables.gameInfo = new GameInfo(data.userAsking, data.userAsked, true, true)
        this._router.navigate(['configgame']);
      } else {
        this.globalVariables.myself.isInGame = false;
        this.myself.isInGame = false;
      }
    })
  }



  ngOnInit(): void {
    this.onLogin();
    this.gotChallengePropositionReceiver();
    this.challengePropositionResponseReceiver();
  }

  askChallenge(targetUsername) {

    console.log('Send askChallenge');

    let tempData = this.globalFunctions.getUsersByUsername([targetUsername]);

    let data = {
      'userAsked': tempData[0],
      'userAsking': this.globalVariables.myself,
    }
    this.socketService.socket.emit('askChallenge', data);

    this.myself.isInGame = true;
  }

  acceptChallenge(targetUsername, accept) {

    console.log('Send acceptChallenge');

    let tempData = this.globalFunctions.getUsersByUsername([targetUsername]);

    let data = {
      'userAsking': tempData[0],
      'userAsked': this.globalVariables.myself,
      'accept' : accept
    }

    this.challengeAsker = null;

    this.socketService.socket.emit('acceptChallenge', data);
    
  }

  debug() {
    console.log(this.globalVariables.myself);
    console.log(this.myself);
    console.log(this.globalVariables.connectedUsers);
    console.log(this.userlist);
  }

}
