import { GlobalVariables } from './globalVariables';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';

@Injectable()
export class GlobalFunctions {

    constructor(private globalVariables: GlobalVariables) {}

    // Return the user object from username put in the same order as the list argument
    getUsersByUsername(usernames: string[]) {


			let tempData: User[] = [];
			let data: User[] = [];

			// Find the users
			this.globalVariables.connectedUsers.forEach(connectedUser => {
      	usernames.forEach(username => {
      		if (connectedUser.username == username) {
        		tempData.push(connectedUser);
        	}
        });
			});

			// Sort in the right order
			usernames.forEach(username => {
				tempData.forEach(user => {
					if (username == user.username) {
						data.push(user);
					}
				});
			});

			return data;
	}
    
}