import {Deck} from './deck';
import {User} from './user';
export class GlobalConstants {

    public static apiURL: string = "http://localhost:3000";

    public static username: string = null;

    public static connectedUsers: User[] = [];

    public static currentDeck: Deck = null;

}