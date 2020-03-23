import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { GlobalVariables } from '../services/globalVariables';
import { SocketioService } from './../services/socketio.service';

import { User } from './../classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _http: HttpClient, private _router: Router, private socketService: SocketioService, private globalVariables: GlobalVariables) { }

  ngOnInit(): void {
  }

  onSubmitLogin(event) {
    let data =  {
      username: event.target[0].value,
      //password: event.target[1].value
    }

    if (data.username == null || data.username == "") {
      this.alertOnLogin(data.username);
      return;
    }

    this.globalVariables.myself = new User(data.username);

    this.socketService.userLogin(data.username);
    /*
    this._http.post<any>(this.globalVariables.apiURL + '/login', data).subscribe((res) => {
      console.log("Response login : ");
      console.log(res);
      this.followingLogin(data);
    });
    */
    
    return;
  }

  

  alertOnLogin(username) {
    return;
  }
}
