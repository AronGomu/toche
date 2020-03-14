import {Deck} from '../shared/deck';
import {User} from '../shared/user';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalConstants {

    public title: string = "toche";

    public apiURL: string = "http://localhost:3000";

    public username: string = null;

    public connectedUsers: User[] = [];

    public currentDeck: Deck = null;

}