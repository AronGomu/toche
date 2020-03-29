import { HttpClient } from '@angular/common/http'

import { GlobalVariables } from './globalVariables';
import { Deck } from '../classes/Deck';
import { Injectable } from '@angular/core';
//import { Card } from './card';

@Injectable()
export class API {

    constructor(private _http: HttpClient, private globalVariables: GlobalVariables) {

    }

    getDecks(callback: (res: any) => any ) {
        this._http.post<any>(this.globalVariables.apiURL + '/getDecks', {data: null}).subscribe((res) => {
            console.log("Response getDecks : ");
            console.log(res);
            callback(res);
        });

      }

    getCards(callback: (res: any) => any ) {
        this._http.post<any>(this.globalVariables.apiURL + '/getCards', {data: null}).subscribe((res) => {
            console.log("Response getCards : ");
            console.log(res);
            callback(res);
        });
    }

    saveDeck(deck: Deck, callback: (res: any) => any ) {
        this._http.post<any>(this.globalVariables.apiURL + '/saveDeck', deck).subscribe((res) => {
            console.log("Response saveDeck : ");
            console.log(res);
            callback(res);
        });
    }
}