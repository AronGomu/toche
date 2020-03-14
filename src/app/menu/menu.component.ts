import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalConstants } from '../services/global-constant';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private _router : Router, public globalConstants: GlobalConstants) {
    if (this.globalConstants.username == null) {
      this._router.navigate(['login'], {replaceUrl: true});
      return;
    }

  }

  ngOnInit(): void {
  }

}
