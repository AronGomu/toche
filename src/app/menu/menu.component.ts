import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalVariables } from '../services/globalVariables';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private _router : Router, public globalVariables: GlobalVariables) {
    if (this.globalVariables.myself == null) {
      this._router.navigate(['login'], {replaceUrl: true});
      return;
    }

  }

  ngOnInit(): void {
    console.log(this.globalVariables.connectedUsers);
  }

}
