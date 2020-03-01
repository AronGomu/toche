import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { GlobalConstants } from './../common/global-constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _http: HttpClient, private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmitRegister(event) {
    let data =  {
      username: event.target[0].value,
      password: event.target[1].value
    }

    if (data.username == null || data.password == null) {
      this.alertOnRegister(data.username, data.password);
      return;
    }

    this._http.post<any>(GlobalConstants.apiURL + '/register', data).subscribe((res) => {
      console.log("Response Register : ");
      console.log(res);
      this.followingRegister(res);
    });
    
    return;
  }

  followingRegister(res) {
    //GlobalConstants.username = res.username;
    this._router.navigate(['login']);
    return;
  }

  alertOnRegister(username, password) {
    return;
  }
}
