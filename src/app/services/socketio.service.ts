import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import * as io from 'socket.io-client';

import { Router } from '@angular/router';

import { GlobalVariables } from './globalVariables';
import { GameInfo } from '../classes/gameInfo';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket;

  constructor(private globalVariables: GlobalVariables, private _router: Router) {}

  setupSocketConnection() {

    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on('user_did_disconnect',(socketId) => {

      console.log("Receive user_did_disconnect : " + socketId);

      for (let i = 0; i < this.globalVariables.connectedUsers.length; i++) {
        if (this.globalVariables.connectedUsers[i].socketId == socketId) {
          this.globalVariables.connectedUsers.splice(i,1);
        }
      }
    });

    this.socket.on('refreshConnectedUserList',(data) => {
      console.log("Receive refreshConnectedUserList : ");
      console.log(data.userlist);
      this.globalVariables.setConnectedUsers(data.userlist)
    });


    this.socket.on('joinRoom', (data) => {

      console.log("Receive joinRoom : ");console.log(data);console.log("");

      this.globalVariables.gameInfo = new GameInfo(data.roomCreator,
                                                    data.roomJoiner,
                                                    false,
                                                    data.isPrivate,
                                                    data.socketRoomName)
      this._router.navigate(['configgame']);
    });

  }

  userLogin(username) {
    this.socket.emit('user_login',username);
  }

}
