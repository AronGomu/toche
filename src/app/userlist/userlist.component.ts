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

      console.log("Receive user_did_login");console.log(data);console.log("");

      this.globalVariables.setConnectedUsers(data.userlist);

      this.userlist = [...this.globalVariables.connectedUsers];
      this.userlist.forEach(user => {
        if (user.username == this.globalVariables.username) {
          this.myself = user;
        }
      });

      for (let i = 0; i < this.userlist.length; i++) {
        if (this.userlist[i].username == this.globalVariables.username) {
          this.userlist.splice(i,1);
        }
      }
    })
  }

  gotChallengePropositionReceiver() {
    this.socketService.socket.on('gotChallengeProposition', (data) => {
      console.log("Receive gotChallengeProposition");console.log(data);console.log("");
      this.challengeAskerData = data.userAsking;
      this.challengeAskerData.isAsker = true;
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

    let tempData = this.globalFunctions.getUsersByUsername([targetUsername,this.globalVariables.username]);

    let data = {
      'userAsked': tempData[0],
      'userAsking': tempData[1],
    }
    this.socketService.socket.emit('askChallenge', data);

    this.myself.isNotInGame = false;
  }

  acceptChallenge(targetUsername, accept) {

    console.log('Send acceptChallenge');

    let tempData = this.globalFunctions.getUsersByUsername([targetUsername,this.globalVariables.username]);

    let data = {
      'userAsking': tempData[0],
      'userAsked': tempData[1],
      'accept' : accept
    }

    this.socketService.socket.emit('acceptChallenge', data);

    this.challengeAskerData.isAsker = false;
    
  }

  debug() {
    console.log(this.challengeAskerData);
  }

}
