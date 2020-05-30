const Player = require('./player');
const Turn = require('./turn');
const CardsManager = require('./cards/cardsManager');
const Stack = require('./zones/stack');

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

class GameManager {

	cardsManager;

	playerUsernameList;

	playerArray = [];

	stack = new Stack();
	turn;
	isStackEmptyBool = true;

	inGameIdGenerator = 0;

	constructor(data,decks1, decks2) {

		this.cardsManager = new CardsManager();

		this.playerUsernameList == [data.myself.username,data.opponent.username];
		this.playerArray.push(new Player(this, data.myself.username, decks1));
		this.playerArray.push(new Player(this, data.opponent.username, decks2));
		this.playerArray[0].opponentPlayer = this.playerArray[1];
		this.playerArray[1].opponentPlayer = this.playerArray[0];

		this.turn = new Turn(this);
	}

	generateInGameId() {
		this.inGameIdGenerator++;
		return this.inGameIdGenerator;
	}

	getPlayerByName(usernameString) {
		for (let i = 0; i < this.playerArray.length; i++) {
			if (this.playerArray[i].usernameString == usernameString) {
				return this.playerArray[i];
			}
			
		}
	}

	getAllCardsInGameWithZone() {
		let allCardsInGameWithZone = [];
		this.stack.cardArray.forEach(effect => {
			if (effect.class === "card") {
				allCardsInGameWithZone.push({"zone": this.stack.zoneName, "card": effect});
			}
		});
		this.playerArray.forEach(player => {
			player.deck.cardArray.forEach(card => {
				allCardsInGameWithZone.push({"zone": player.deck.zoneName, "card": card});
			});
			player.extraDeck.cardArray.forEach(card => {
				allCardsInGameWithZone.push({"zone": player.extraDeck.zoneName, "card": card});
			});
			player.sideDeck.cardArray.forEach(card => {
				allCardsInGameWithZone.push({"zone": player.sideDeck.zoneName, "card": card});
			});
			player.hand.cardArray.forEach(card => {
				allCardsInGameWithZone.push({"zone": player.hand.zoneName, "card": card});
			});
			player.field.cardArray.forEach(card => {
				allCardsInGameWithZone.push({"zone": player.field.zoneName, "card": card});
			});
			player.graveyard.cardArray.forEach(card => {
				allCardsInGameWithZone.push({"zone": player.graveyard.zoneName, "card": card});
			});
			player.exile.cardArray.forEach(card => {
				allCardsInGameWithZone.push({"zone": player.exile.zoneName, "card": card});
			});
		});
		return allCardsInGameWithZone;
	}

	findCardByinGameIdInt(inGameIdInt) {
		let allCardsWithZone = this.getAllCardsInGameWithZone();
		for (let i = 0; i < allCardsWithZone.length; i++) {
			if (allCardsWithZone[i].card.inGameIdInt == inGameIdInt) {
				return allCardsWithZone[i].card;
			}
		}
	}

	findCardInPlayerHandByinGameIdInt(player, inGameIdInt) {
		for (let i = 0; i < player.hand.cardArray.length; i++) {
			if (player.hand.cardArray[i].inGameIdInt == inGameIdInt) {
				return player.hand.cardArray[i];
			}
			
		}
	}

	popCardInPlayerHandByinGameIdInt(player, inGameIdInt) {
		for (let i = 0; i < player.hand.cardArray.length; i++) {
			console.log(inGameIdInt + " & " + player.hand.cardArray[i].inGameIdInt);
			if (player.hand.cardArray[i].inGameIdInt == inGameIdInt) {
				let cardToReturn = player.hand.cardArray[i];
				player.hand.cardArray.splice(i,1);
				return cardToReturn;
			}
			
		}
	}

	checkAllPayableCardsAllZones() {
		this.playerArray.forEach(player => {
			player.checkAllPayableCardsAllZones(this.turn, this.isStackEmptyBool);
		});
	}

	initializeGame() {

		console.log(this.cardsManager.getCardNameById(1));

		this.playerArray.forEach(player => {
			player.deck.shuffle();
			player.draw(5);
		});
		let indexStartingPlayerNumber = getRandomInt(0,1);
		this.playerArray[indexStartingPlayerNumber].haveTurnBool = true;
		this.playerArray[indexStartingPlayerNumber].havePriorityBool = true;
		this.turn.hasTurnPlayerBool = this.playerArray[indexStartingPlayerNumber];
		this.turn.hasPriorityPlayerBool = this.turn.hasTurnPlayerBool;
		this.turn.hasTurnPlayerBool.manapool.addMana("UB");
		this.checkAllPayableCardsAllZones();
	}

	fetchGameStateToPayCost(username) {
		return this.fetchGameState(username);
	}

	fetchGameStatePassingPriority(username) {
		this.checkAllPayableCardsAllZones();
		return this.fetchGameState(username);
	}

	fetchGameState(username) {

		this.checkAllPayableCardsAllZones();
		
		let data = {};

		this.playerArray.forEach(player => {

			if (username == player.usernameString) {
				data.currentPhaseString = this.turn.phase.phaseNameString;
				data.hasTurnPlayerBoolUsernameString = this.turn.hasTurnPlayerBool.usernameString;
				data.yieldThroughTurnBool = player.yieldThroughTurnBool;

				data.haveTurnBool = player.haveTurnBool;
				data.havePriorityBool = player.havePriorityBool;
				data.stack = this.stack.cardArray;
				data.isStackEmptyBool = this.isStackEmptyBool;


				data.myColorlessMana = player.manapool.colorlessManaInt;
				data.myBlueMana = player.manapool.blueManaInt;
				data.myBlackMana = player.manapool.blackManaInt;

				data.myDeck = player.getDeck(true);
				data.myExtraDeck = player.getExtraDeck(true);
				data.mySideDeck = player.getSideDeck(true);
				data.myHand = player.getHand(true);
				data.myField = player.getField(true);
				data.myGraveyard = player.getGraveyard(true);
				data.myExile = player.getExile(true);
			}
			else {
				data.oppColorlessMana = player.manapool.colorlessManaInt;
				data.oppBlueMana = player.manapool.blueManaInt;
				data.oppBlackMana = player.manapool.blackManaInt;

				data.oppDeck = player.getDeck(false);
				data.oppExtraDeck = player.getExtraDeck(false);
				data.oppSideDeck = player.getSideDeck(false);
				data.oppHand = player.getHand(false);
				data.oppField = player.getField(false);
				data.oppGraveyard = player.getGraveyard(false);
				data.oppExile = player.getExile(false);
			}
		});
		
		return data;
	}

	passPriority(usernameString) {

		// Fetch Player
		let player = this.getPlayerByName(usernameString);

		// Set isEmptyStackBool
		if (this.stack.cardArray.length == 0) {
			this.isStackEmptyBool = true;
		} else {
			this.isStackEmptyBool = false;
		}

		// FIRST ! Setting turn and priority of both players

		console.log("this.isStackEmptyBool : " + this.isStackEmptyBool);
		console.log("player.usernameString : " + player.usernameString);
		console.log("this.turn.hasTurnPlayerBool.opponentPlayer.usernameString : " + this.turn.hasTurnPlayerBool.opponentPlayer.usernameString);

		// If no stack and opp of active player has priority (who pass priority), go to next phase
		if (this.isStackEmptyBool == true && player.usernameString == this.turn.hasTurnPlayerBool.opponentPlayer.usernameString) {
			this.turn.nextPhase();
		}
		// If stack not empty and opp of active player has priority (who pass priority), pop stack to resolve card/effect
		else if (this.isStackEmptyBool == false && player.usernameString == this.turn.hasTurnPlayerBool.opponentPlayer.usernameString) {
			this.cardsManager.getCardById(this.stack.cardArray[this.stack.cardArray.length-1].idInt).resolvePlayCard(this, this.stack.cardArray[this.stack.cardArray.length-1]);
			this.turn.hasPriorityPlayerBool = this.turn.hasPriorityPlayerBool.opponentPlayer;
			player.havePriorityBool = false;
    	player.opponentPlayer.havePriorityBool = true;
		}
		// Else active player pass priority
		else {
			this.turn.hasPriorityPlayerBool = this.turn.hasPriorityPlayerBool.opponentPlayer;
			player.havePriorityBool = false;
    	player.opponentPlayer.havePriorityBool = true;
		}

		// Do actions depending of the phase

		// If we are in draw phase and we are entering the phase
		if (this.turn.phase.phaseNameString == "draw" && this.turn.beginningPhaseBool == true) {
			this.turn.hasTurnPlayerBool.manapool.addMana("UB");
			this.turn.hasTurnPlayerBool.draw(1);
			this.playerArray.forEach(player => {
				player.yieldThroughTurnBool = false;
			});
		}

		// All actions are done, we are not entering the phase anymore
		this.turn.beginningPhaseBool = false;


		// If player yield through turn, skip priority
		if (this.turn.hasPriorityPlayerBool.yieldThroughTurnBool == true) {
			return this.passPriority(this.turn.hasPriorityPlayerBool.usernameString);
		} else {
			return this.turn.phase.phaseNameString;
		}



	}

	receivePassTurn(usernameString) {
		let player = this.getPlayerByName(usernameString);
		player.yieldThroughTurnBool = true;
		return this.passPriority(usernameString);
	}


	playCard(playerPlayingCardUsername, inGameIdInt) {
		console.log("playCard, cardId : " + inGameIdInt);

		// get player
		let player = this.getPlayerByName(playerPlayingCardUsername);

		// Set all other playable cards as unplayable
		this.passPriority(playerPlayingCardUsername);


		// Put the card onto the stack from hand
		console.log(this.stack.cardArray.push(this.popCardInPlayerHandByinGameIdInt(player, inGameIdInt)));
		this.isStackEmptyBool = false;
		console.log("this.stack.cardArray");
		console.log(this.stack.cardArray);

		// get card in game from inGameIdInt
		let card = this.findCardByinGameIdInt(inGameIdInt);

		// cast card as the subclass from idInt of card, to access subclass functions 
		let abstractCard = this.cardsManager.getCardById(card.idInt);

		// return the result of the subclass functions
		return abstractCard.getCostToPlayCard(player);
	}

	// It's precised in the card code if has no cost that the user need to pay manually
	resolveCardWithNoCost(playerPlayingCardUsername, inGameIdInt) {
		let player = this.getPlayerByName(playerPlayingCardUsername);
		let cardToResolveCard = this.findCardByinGameIdInt(inGameIdInt);
		let cardToResolveCardSubClass =  this.cardsManager.getCardById(cardToResolveCard.idInt);
		return cardToResolveCardSubClass.payCostToPlayCard(this, player);
	}

	
	resolveCard(costsCompleted) {
		let cardToResolveInGameIdInt = costsCompleted[0].inGameIdCardPayingCostInt;
		let cardToResolveCard = this.findCardByinGameIdInt(cardToResolveInGameIdInt);
		let cardToResolveCardSubClass =  this.cardsManager.getCardById(cardToResolveCard.idInt);
		return cardToResolveCardSubClass.payCostToPlayCard(this, costsCompleted);
	}


}

module.exports = GameManager;