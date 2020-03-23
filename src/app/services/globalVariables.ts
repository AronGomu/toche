import {Deck} from '../classes/deck';
import {User} from '../classes/user';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVariables {

  public title: string = "toche";

  public apiURL: string = "http://localhost:3000";

  public myself: User = null;

  public connectedUsers: User[] = [];

  public currentDeck: Deck = null;

  public gameCreatorInitializer = {
    'roomCreator': null,
    'roomJoiner': null,
    'isCreator': null,
    'isPrivate': null,
    'socketRoomName': null,
  };

  public setMyself(myself: User) {
    this.myself = myself;
  }


  public setConnectedUsers (userlist) {
    if (this.myself.username == null) {
      return;
    }
      
    this.connectedUsers = userlist;
      
    this.connectedUsers.forEach(element => {
			if (element.username == this.myself.username) {
				element.isNotMe = false;
			} else {
				element.isNotMe = true;
			}
		});
	}
}