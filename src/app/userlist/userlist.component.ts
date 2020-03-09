import { Component, OnInit } from '@angular/core';

import { GlobalConstants } from './../common/global-constant';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  public friends = [];

  constructor() {
    this.friends = GlobalConstants.connectedUsers;
    for (let i = 0; i < this.friends.length; i++) {
      if (this.friends[i].username == GlobalConstants.username) {
        this.friends.splice(i,1);
      }
      
    }
  }

  ngOnInit(): void {
  }

}
