import { Player } from './Player';
import { GameInfo } from 'src/app/classes/gameInfo';
import { User } from 'src/app/classes/user';
import { Deck } from 'src/app/classes/Deck';
import { Turn } from './Turn';
export class Game {

  public myselfUser: User;
  public opponentUser: User;
  public gameInfo: GameInfo;

  public me: Player;
  public opponent: Player;

  public turn: Turn;

  public isStackEmpty: boolean;

  constructor(myselfUser: User, opponentUser: User, gameInfo: GameInfo) {
    this.myselfUser = myselfUser;
    this.opponentUser = opponentUser;
    this.gameInfo = gameInfo;

    this.me = new Player(this.myselfUser.username);
    this.opponent = new Player(this.opponentUser.username);

    this.me.opponent = this.opponent;
    this.opponent.opponent = this.me;

    this.turn = new Turn(this.me);
  }

  getPlayerByName(username: string) {
		if (username == this.me.username) {
      return this.me
    }
    return this.opponent;
	}

  public getDataForSocketConnexion() {
    return {"myself": this.myselfUser, "opponent": this.opponentUser, "gameInfo": this.gameInfo};
  }

  public getDataForSocketConnexionWithDeck(deck: Deck) {
    return {"myself": this.myselfUser,"opponent": this.opponentUser,"gameInfo": this.gameInfo,"myDeck": deck}
  }

  public getDataForSocketConnexionWithCardId(cardId: string) {
    return {"myself": this.myselfUser,"opponent": this.opponentUser,"gameInfo": this.gameInfo,"cardId": cardId}
  }

}