import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import * as io from 'socket.io-client';

import { GlobalConstants } from './../common/global-constant';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket;

  constructor() { }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on('user_did_login',(data) => {
      console.log("before connect");
      console.log(GlobalConstants.connectedUsers);
      GlobalConstants.connectedUsers = data.alreadyConnectedUsers;
      console.log("after connect");
      console.log(GlobalConstants.connectedUsers);
    })

    this.socket.on('user_did_disconnect',(socketId) => {
      console.log("before disconnect");
      console.log(GlobalConstants.connectedUsers);
      for (let i = 0; i < GlobalConstants.connectedUsers.length; i++) {
        if (GlobalConstants.connectedUsers[i].socketId == socketId) {
          GlobalConstants.connectedUsers.splice(i,1);
        }
      }
      console.log("after disconnect");
      console.log(GlobalConstants.connectedUsers);
    })
  }

  userLogin(username) {
    this.socket.emit('user_login',username);
  }

}
