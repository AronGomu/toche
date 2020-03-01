import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { GlobalConstants } from './../common/global-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _http: HttpClient, private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmitLogin(event) {
    let data =  {
      username: event.target[0].value,
      password: event.target[1].value
    }

    if (data.username == null || data.password == null) {
      this.alertOnLogin(data.username, data.password);
      return;
    }

    this._http.post<any>(GlobalConstants.apiURL + '/login', data).subscribe((res) => {
      console.log("Response login : ");
      console.log(res);
      this.followingLogin(data);
    });
    
    return;
  }

  followingLogin(data) {
    GlobalConstants.username = data.username;
    console.log(GlobalConstants.username);
    this._router.navigate(['menu']);
    return;
  }

  alertOnLogin(username, password) {
    return;
  }
}
