import { Component, OnInit } from '@angular/core';

import { GlobalConstants } from '../services/global-constant';
import { SocketioService } from './../services/socketio.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  constructor(public globalConstants: GlobalConstants,  private socketService: SocketioService) {
    for (let i = 0; i < this.globalConstants.connectedUsers.length; i++) {
      if (this.globalConstants.connectedUsers[i].username == this.globalConstants.username) {
        this.globalConstants.connectedUsers.splice(i,1);
      }
      
    }
  }

  askChallenge(event) {
    console.log(event.target.id);
    this.socketService.askChallenge(event.target.id);
  }

  ngOnInit(): void {
  }

}
