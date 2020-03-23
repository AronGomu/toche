import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { GlobalVariables } from '../services/globalVariables';
import { GlobalFunctions } from '../services/globalFunctions';
import { SocketioService } from './../services/socketio.service';
import { User } from '../classes/user';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {


  public myself: User;
  public userlist = null;

  challengeAskerData =  {
    'isAsker': false,
    'username': null,
    'socketId' : null
  }



  constructor(public globalVariables: GlobalVariables, private globalFunctions: GlobalFunctions,  private socketService: SocketioService, private _router: Router) {}

  public onLogin():  void {
    this.socketService.socket.on('user_did_login',(data) => {

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
      this.challengeAskerData = data.userAsking;
      this.challengeAskerData['isAsker'] = true;
      this.userlist.forEach(user => {
        if (user.username == this.globalVariables.myself.username) {
          user.isNotInGame = true;
        }
      });
    })
  }

  challengePropositionResponseReceiver() {
    this.socketService.socket.on('challengePropositionResponse', (data) => {
      console.log("Receive challengePropositionResponse");console.log(data);console.log("");

      if (data.accept == true) {
        this.socketService.socket.emit('refreshConnectedUserList');
        this.globalVariables.gameCreatorInitializer = {
          'roomCreator': data.userAsking,
          'roomJoiner': data.userAsked,
          'isCreator': true,
          'isPrivate': true,
          'socketRoomName' : null,
        }
        
        this._router.navigate(['configgame']);
      } else {
        this.challengeAskerData['isAsker'] = false;
        this.globalVariables.myself.isNotInGame = true;
        this.myself.isNotInGame = true;
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

    this.myself.isNotInGame = false;
  }

  acceptChallenge(targetUsername, accept) {

    console.log('Send acceptChallenge');

    let tempData = this.globalFunctions.getUsersByUsername([targetUsername]);

    let data = {
      'userAsking': tempData[0],
      'userAsked': this.globalVariables.myself,
      'accept' : accept
    }

    this.socketService.socket.emit('acceptChallenge', data);

    this.challengeAskerData.isAsker = false;
    
  }

  debug() {
    console.log(this.globalVariables.myself);
    console.log(this.myself);
    console.log(this.globalVariables.connectedUsers);
    console.log(this.userlist);
  }

}
