import {Deck} from '../classes/deck';
import {User} from '../classes/user';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVariables {

  public title: string = "toche";

  public apiURL: string = "http://localhost:3000";

  public username: string = null;

  public connectedUsers: User[] = [];

  public currentDeck: Deck = null;

  public gameCreatorInitializer = {
    'roomCreator': null,
    'roomJoiner': null,
    'isCreator': null,
    'isPrivate': null,
    'socketRoomName': null,
  };


  public setConnectedUsers (userlist) {
    if (this.username == null) {
      return;
    }
      
    this.connectedUsers = userlist;
      
    this.connectedUsers.forEach(element => {
			if (element.username == this.username) {
				element.isNotMe = false;
			} else {
				element.isNotMe = true;
			}
		});
	}
}