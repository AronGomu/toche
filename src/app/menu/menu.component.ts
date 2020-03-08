import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalConstants } from './../common/global-constant';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  globals;

  constructor(private _router : Router) {
    if (GlobalConstants.username == null) {
      this._router.navigate(['login'], {replaceUrl: true});
      return;
    }

    this.globals = GlobalConstants;
  }

  ngOnInit(): void {
  }

}
