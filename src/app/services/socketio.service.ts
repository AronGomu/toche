import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import * as io from 'socket.io-client';

import { UserlistComponent } from './../userlist/userlist.component';

import { GlobalConstants } from '../shared/global-constant';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket;

  constructor(private globalConstants: GlobalConstants) {}

  setupSocketConnection() {

    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on('user_did_login',(data) => {
      this.globalConstants.connectedUsers = data.alreadyConnectedUsers;
    })

    this.socket.on('user_did_disconnect',(socketId) => {
      for (let i = 0; i < this.globalConstants.connectedUsers.length; i++) {
        if (this.globalConstants.connectedUsers[i].socketId == socketId) {
          this.globalConstants.connectedUsers.splice(i,1);
        }
      }
    })
  }

  userLogin(username) {
    this.socket.emit('user_login',username);
  }

}
