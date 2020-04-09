import { Player } from './Player';
import { GameInfo } from 'src/app/classes/gameInfo';
import { User } from 'src/app/classes/user';
import { Deck } from 'src/app/classes/Deck';
export class Game {

  public myselfUser: User;
  public opponentUser: User;
  public gameInfo: GameInfo;

  public mePlayer: Player;
  public oppPlayer: Player;

  constructor(myselfUser: User, opponentUser: User, gameInfo: GameInfo) {
    this.myselfUser = myselfUser;
    this.opponentUser = opponentUser;
    this.gameInfo = gameInfo;

    this.mePlayer = new Player(this.myselfUser.username);
    this.oppPlayer = new Player(this.opponentUser.username);
  }

  public getDataForSocketConnexion() {
    return {"myself": this.myselfUser, "opponent": this.opponentUser, "gameInfo": this.gameInfo};
  }

  public getDataForSocketConnexionWithDeck(deck: Deck) {
    return {"myself": this.myselfUser,"opponent": this.opponentUser,"gameInfo": this.gameInfo,"myDeck": deck}
  }

}