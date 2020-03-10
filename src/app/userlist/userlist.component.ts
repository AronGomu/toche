import { Component, OnInit } from '@angular/core';

import { GlobalConstants } from '../shared/global-constant';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  constructor(public globalConstants: GlobalConstants) {
    for (let i = 0; i < this.globalConstants.connectedUsers.length; i++) {
      if (this.globalConstants.connectedUsers[i].username == this.globalConstants.username) {
        this.globalConstants.connectedUsers.splice(i,1);
      }
      
    }
  }

  ngOnInit(): void {
  }

}
