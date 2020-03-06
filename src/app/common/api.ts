import { HttpClient } from '@angular/common/http'

import { GlobalConstants } from './global-constant';
import { Deck } from './deck';
import { Injectable } from '@angular/core';
//import { Card } from './card';

@Injectable()
export class API {

    constructor(private _http: HttpClient) {

    }

    getDecks(callback: (res: any) => any ) {
        this._http.post<any>(GlobalConstants.apiURL + '/getDecks', {data: null}).subscribe((res) => {
            console.log("Response getDecks : ");
            console.log(res);
            callback(res);
        });

      }

    getCards(callback: (res: any) => any ) {
        this._http.post<any>(GlobalConstants.apiURL + '/getCards', {data: null}).subscribe((res) => {
            console.log("Response getCards : ");
            console.log(res);
            callback(res);
        });
    }

    saveDeck(deck: Deck, callback: (res: any) => any ) {
        this._http.post<any>(GlobalConstants.apiURL + '/saveDeck', deck).subscribe((res) => {
            console.log("Response saveDeck : ");
            console.log(res);
            callback(res);
        });
    }
}