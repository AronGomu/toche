import { Player } from './Player';
import { GameInfo } from 'src/app/classes/gameInfo';
import { User } from 'src/app/classes/user';
import { Turn } from './Turn';
import { Card } from 'src/app/classes/card';
export class Game {

  public myselfUser: User;
  public opponentUser: User;
  public gameInfo: GameInfo;

  public me: Player;
  public opponent: Player;

  public turn: Turn;

  public stack;

  public allCards: Card[] = [];

  // UTILITY VARIABLES FOR DISPLAY

  public isStackEmpty: boolean = true;

  // Cost Section

  public costToExploit: any;
  public costs: any[];
  private costIndex: number = 0;

  // CONSTRUCTOR

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

  setGameState(data: any) {
    this.turn.setCurrentPhase(data.currentPhaseString);
    this.turn.hasTurnPlayer = this.getPlayerByName(data.hasTurnPlayerUsernameString);

    this.me.haveTurn = data.haveTurnBool;
    this.me.havePriority = data.havePriorityBool;

    this.me.yieldThroughTurn = data.yieldThroughTurnBool;

    this.isStackEmpty = data.isStackEmptyBool;
    this.stack = data.stack;

    this.me.manapool.colorlessMana;
    this.me.manapool.blueMana;
    this.me.manapool.blackMana;

    this.me.deck = data.myDeck;
    this.me.extraDeck = data.myExtraDeck;
    this.me.sideDeck = data.mySideDeck;

    this.me.hand = data.myHand;
    this.me.field = data.myField;
    this.me.graveyard = data.myGraveyard;
    this.me.exile = data.myExile;

    // setup graveyard utility variable
    if (this.me.graveyard.length == 0) {
      this.me.isGraveyardEmpty = true;
      this.me.lastCardFromGraveyard = null;
    } else {
      this.me.isGraveyardEmpty = false;
      this.me.lastCardFromGraveyard = this.me.graveyard[this.me.graveyard.length-1];
    }

    // setup deck utility variable
    if (this.me.deck.length == 0) {
      this.me.isTopCardFromDeckRevealed = false;
      this.me.topCardFromDeck = null;
    } else {
      if (this.me.deck[this.me.deck.length-1].revealedBool == true) {
        this.me.isTopCardFromDeckRevealed = true;
        this.me.topCardFromDeck = this.me.deck[this.me.deck.length-1];
      }
    }

    // OPP SIDE
    this.opponent.manapool.colorlessMana;
    this.opponent.manapool.blueMana;
    this.opponent.manapool.blackMana;

    this.opponent.deck = data.oppDeck;
    this.opponent.extraDeck = data.oppExtraDeck;
    this.opponent.sideDeck = data.oppSideDeck;

    this.opponent.hand = data.oppHand;
    this.opponent.field = data.oppField;
    this.opponent.graveyard = data.oppGraveyard;
    this.opponent.exile = data.oppExile;

    // setup graveyard utility variable
    if (this.opponent.graveyard.length == 0) {
      this.opponent.isGraveyardEmpty = true;
      this.opponent.lastCardFromGraveyard = null;
    } else {
      this.opponent.isGraveyardEmpty = false;
      this.opponent.lastCardFromGraveyard = this.opponent.graveyard[this.opponent.graveyard.length-1];
    }

    // setup graveyard utility variable
    if (this.opponent.deck.length == 0) {
      this.opponent.isTopCardFromDeckRevealed = false;
      this.opponent.topCardFromDeck = null;
    } else {
      if (this.opponent.deck[this.opponent.deck.length-1].revealedBool == true) {
        this.opponent.isTopCardFromDeckRevealed = true;
        this.opponent.topCardFromDeck = this.opponent.deck[this.opponent.deck.length-1];
      }
    }

    this.updateAllCards();
  }

  getPlayerByName(username: string) {
		if (username == this.me.username) {
      return this.me
    }
    return this.opponent;
  }
  
  updateAllCards() {
    this.allCards = [];
    this.me.deck.forEach(card => {
      this.allCards.push(card);
    });
    this.me.extraDeck.forEach(card => {
      this.allCards.push(card);
    });
    this.me.sideDeck.forEach(card => {
      this.allCards.push(card);
    });
    this.me.hand.forEach(card => {
      this.allCards.push(card);
    });
    this.me.field.forEach(card => {
      this.allCards.push(card);
    });
    this.me.graveyard.forEach(card => {
      this.allCards.push(card);
    });
    this.me.exile.forEach(card => {
      this.allCards.push(card);
    });

    this.opponent.deck.forEach(card => {
      this.allCards.push(card);
    });
    this.opponent.extraDeck.forEach(card => {
      this.allCards.push(card);
    });
    this.opponent.sideDeck.forEach(card => {
      this.allCards.push(card);
    });
    this.opponent.hand.forEach(card => {
      this.allCards.push(card);
    });
    this.opponent.field.forEach(card => {
      this.allCards.push(card);
    });
    this.opponent.graveyard.forEach(card => {
      this.allCards.push(card);
    });
    this.opponent.exile.forEach(card => {
      this.allCards.push(card);
    });
  }

  getCardFromInGameId(InGameId: number) {
    for (let i = 0; i < this.allCards.length; i++) {
      if (this.allCards[i].inGameIdInt == InGameId) {
        console.log("FOUND CARD");
        console.log(this.allCards[i]);
        return this.allCards[i];
      }
    }
  }

  public getDataForSocketConnexion() {
    return {"myself": this.myselfUser, "opponent": this.opponentUser, "gameInfo": this.gameInfo};
  }

  public getDataForSocketConnexionWithcardsSelected() {
    return {"myself": this.myselfUser,"opponent": this.opponentUser,"gameInfo": this.gameInfo,"costsCompleted": this.costs};
  }

  public getDataForSocketConnexionWithOtherData(otherData) {
    return {"myself": this.myselfUser, "opponent": this.opponentUser, "otherData": otherData};
  }

  public getDataForSocketConnexionWithDeck(myDecks: object) {
    return {"myself": this.myselfUser,"opponent": this.opponentUser,"gameInfo": this.gameInfo,"myDecks": myDecks};
  }

  public getDataForSocketConnexionWithinGameId(cardId: number) {
    return {"myself": this.myselfUser,"opponent": this.opponentUser,"gameInfo": this.gameInfo, "inGameIdInt": cardId};
  }

  public payCost() {
    console.log("START PAYCOST : ");

    if (this.costToExploit) {
      this.costs = [];
      console.log("STARTING PAYING COST");
      this.costToExploit.forEach(cost => {
        this.costs.push(cost);
      });
      this.costToExploit = null;
    } else {
      console.log("IS ALREADY PAYING COST");
      this.costIndex++;
      console.log("this.costIndex : " + this.costIndex);
      console.log("this.costs.length : " + this.costs.length);
      if (this.costs.length === this.costIndex) {
        return true;
      }
    }

    let playerTargeted: Player[] = [];
    switch (this.costs[this.costIndex].playerPayingCostUsernameString) {
      case this.me.username:
        playerTargeted.push(this.me);
        break;

      case this.opponent.username:
        playerTargeted.push(this.opponent);
        break;

      case "any":
        playerTargeted.push(this.me);
        playerTargeted.push(this.opponent);
        break;

      default:
        throw new Error("playerTargeted is not valid !\nthis.costs[this.costIndex].playerPayingCostUsernameString : " + this.costs[this.costIndex].playerPayingCostUsernameString);
    }

    let zoneTargeted: Card[][] = [];
    this.costs[this.costIndex].zoneStringArray.forEach(zone => {
      switch (zone) {
        case "deck":
          playerTargeted.forEach(player => {
            zoneTargeted.push(player.deck);
          });
          break;
        
        case "extraDeck":
          playerTargeted.forEach(player => {
            zoneTargeted.push(player.extraDeck);
          });
          break;

        case "sideDeck":
          playerTargeted.forEach(player => {
            zoneTargeted.push(player.sideDeck);
          });
          break;

        case "hand":
          playerTargeted.forEach(player => {
            zoneTargeted.push(player.hand);
          });
          break;
        
        case "field":
          playerTargeted.forEach(player => {
            zoneTargeted.push(player.field);
          });
          break;

        case "graveyard":
          playerTargeted.forEach(player => {
            zoneTargeted.push(player.graveyard);
          });
          break;

        case "exile":
          playerTargeted.forEach(player => {
            zoneTargeted.push(player.exile);
          });
          break;

        default:
          throw new Error("zoneTargeted is not valid !\nthis.costs[this.costIndex].zoneStringArray : " + this.costs[this.costIndex].zoneStringArray);
      }      
    });

    zoneTargeted.forEach(zone => {
      zone.forEach(card => {
        card.selectableBool = true;
      });
    });

    console.log(this.costs);
    console.log("END PAYCOST");
    return false;
  }

  setCardsSelectedForCost(inGameId) {

    // set the card as selected
    this.getCardFromInGameId(inGameId).selectedBool = true;
    
    // push the inGameId of the card in the data to send
    this.costs[this.costIndex].selectedCardInGameIdInt.push(inGameId);
    console.log(this.costs);
  }

}