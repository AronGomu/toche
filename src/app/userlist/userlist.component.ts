import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { GlobalVariables } from '../services/globalVariables';
import { GlobalFunctions } from '../services/globalFunctions';
import { SocketioService } from './../services/socketio.service';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  public userlist = null;

  challengeAskerData =  {
    'username': null,
    'socketId' : null
  }

  constructor(public globalVariables: GlobalVariables, private globalFunctions: GlobalFunctions,  private socketService: SocketioService, private _router: Router) {}

  public onLogin():  void {
    this.socketService.socket.on('user_did_login',(data) => {

      console.log("Receive user_did_login");console.log(data);console.log("");

      if (this.globalVariables.username == null) {
        return;
      }

      this.globalVariables.connectedUsers = data;

      this.globalVariables.connectedUsers.forEach(element => {
        if (element.username == this.globalVariables.username) {
          element.isNotMe = false;
        }
        else {
          element.isNotMe = true;
        }
      });

      this.userlist = [...this.globalVariables.connectedUsers];

      for (let i = 0; i < this.userlist.length; i++) {
        if (this.userlist[i].username == this.globalVariables.username) {
          this.userlist.splice(i,1);
        }
      }

      this.userlist.forEach(user => {
        user['askedChallenge'] = false;
      });
    })
  }

  gotChallengePropositionReceiver() {
    this.socketService.socket.on('gotChallengeProposition', (data) => {
      console.log("Receive gotChallengeProposition");console.log(data);console.log("");
      this.challengeAskerData = data.userAsking;
      for (let i = 0; i < this.userlist.length; i++) {
        if ( this.challengeAskerData.username = this.userlist[i].username ) {
          this.userlist[i].askedChallenge = true;
        }
      }
    })
  }

  challengePropositionResponseReceiver() {
    this.socketService.socket.on('challengePropositionResponse', (data) => {
      console.log("Receive challengePropositionResponse");console.log(data);console.log("");

      if (data.accept == true) {
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
    
  }

  debug() {
    console.log(this.globalVariables.connectedUsers);
    this.globalVariables.connectedUsers.forEach(element => {
      console.log(element);
    });
  }

}
