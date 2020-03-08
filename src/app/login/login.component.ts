import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { GlobalConstants } from './../common/global-constant';

import { SocketioService } from './../services/socketio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _http: HttpClient, private _router: Router, private socketService: SocketioService) { }

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

    this.socketService.userLogin(data.username);

    GlobalConstants.username = data.username;
    
    this._router.navigate(['menu']);
    /*
    this._http.post<any>(GlobalConstants.apiURL + '/login', data).subscribe((res) => {
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
