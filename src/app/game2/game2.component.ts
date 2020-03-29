import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from '../services/globalVariables';
import { Router } from '@angular/router';
import { User } from '../classes/user';

@Component({
  selector: 'app-game2',
  templateUrl: './game2.component.html',
  styleUrls: ['./game2.component.scss']
})
export class Game2Component implements OnInit {

  constructor(public globalVariables: GlobalVariables,  private _router: Router) {
    this.globalVariables.myself = new User(null, null, null, null);
    this._router.navigate(['game']);
  }

  ngOnInit(): void {
  }

}
