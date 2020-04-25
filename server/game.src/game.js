const Player = require('./player');
const Turn = require('./turn');

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

class GameManager {

	playerUsernameList;

	playerArray = [];

	turn;
	isStackEmptyBool = true;

	constructor(data,deck1, deck2) {
		this.playerUsernameList == [data.myself.username,data.opponent.username];
		this.playerArray.push(new Player(data.myself.username, deck1));
		this.playerArray.push(new Player(data.opponent.username, deck2));
		this.playerArray[0].opponentPlayer = this.playerArray[1];
		this.playerArray[1].opponentPlayer = this.playerArray[0];

		this.turn = new Turn()
	}

	getPlayerByName(usernameString) {
		for (let i = 0; i < this.playerArray.length; i++) {
			if (this.playerArray[i].usernameString == usernameString) {
				return this.playerArray[i];
			}
			
		}
	}

	initializeGame() {
		this.playerArray.forEach(player => {
			player.deck.shuffle();
			player.draw(5);
		});
		let indexStartingPlayerNumber = getRandomInt(0,1);
		this.playerArray[indexStartingPlayerNumber].haveTurnBool = true;
		this.playerArray[indexStartingPlayerNumber].havePriorityBool = true;
		this.turn.hasTurnPlayer = this.playerArray[indexStartingPlayerNumber];
		this.turn.hasPriorityPlayer = this.turn.hasTurnPlayer;
		this.turn.hasTurnPlayer.manapool.addMana("UB");
		this.checkAllPayableCardsAllZones();
	}

	checkAllPayableCardsAllZones() {
		this.playerArray.forEach(player => {
			player.checkAllPayableCardsAllZones(this.turn, this.isStackEmptyBool);
		});
	}

	fetchGameState(username) {

		this.checkAllPayableCardsAllZones();
		
		let data = {
			"currentPhaseString": null,
			"hasTurnPlayerUsernameString": null,

			"haveTurnBool": null,
			"havePriorityBool" : null,
			"yieldThroughTurnBool": null,

			"isStackEmptyBool" : null,

			"myBlueMana" : null,
			"myBlackMana" : null,
			"myColorlessMana" : null,
			"myDeckArray" : null,
			"myHandArray" : null,

			"oppBlueMana" : null,
			"oppBlackMana" : null,
			"oppColorlessMana" : null,
			"oppDeckArray" : null,
			"oppHandArray" : null,
		}

		this.playerArray.forEach(player => {

			if (username == player.usernameString) {
				data.currentPhaseString = this.turn.phase.phaseNameString;
				data.hasTurnPlayerUsernameString = this.turn.hasTurnPlayer.usernameString;
				data.yieldThroughTurnBool = player.yieldThroughTurnBool;

				data.haveTurnBool = player.haveTurnBool;
				data.havePriorityBool = player.havePriorityBool;
				data.isStackEmptyBool = this.isStackEmptyBool;

				data.myColorlessMana = player.manapool.colorlessManaInt;
				data.myBlueMana = player.manapool.blueManaInt;
				data.myBlackMana = player.manapool.blackManaInt;

				data.myDeckArray = player.getDeck(false);
				data.myHandArray = player.getHand(true);
			}
			else {
				data.oppColorlessMana = player.manapool.colorlessManaInt;
				data.oppBlueMana = player.manapool.blueManaInt;
				data.oppBlackMana = player.manapool.blackManaInt;

				data.oppDeckArray = player.getDeck(false);
				data.oppHandArray = player.getHand(false);
			}
		});

		return data;
	}

	receivePassPriority(usernameString) {

		// Fetch Player
		let player = this.getPlayerByName(usernameString);

		// Setting turn and priority of both players
		if (this.isStackEmptyBool == true && player.usernameString == this.turn.hasTurnPlayer.opponentPlayer.usernameString) {
			this.turn.nextPhase();
		}
		else {
			this.turn.hasPriorityPlayer = this.turn.hasPriorityPlayer.opponentPlayer;
			player.havePriorityBool = false;
    	player.opponentPlayer.havePriorityBool = true;
		}

		// Do actions depending of the phase
		if (this.turn.phase.phaseNameString == "draw" && this.turn.hasTurnPlayer.usernameString == this.turn.hasPriorityPlayer.usernameString) {
			this.turn.hasTurnPlayer.manapool.addMana("UB");
			this.turn.hasTurnPlayer.draw(1);
			this.playerArray.forEach(player => {
				player.yieldThroughTurnBool = false;
			});
		}

		this.playerArray.forEach(player => {
		});

		// If player yield through turn, skip priority
		if (this.turn.hasPriorityPlayer.yieldThroughTurnBool == true) {
			this.receivePassPriority(this.turn.hasPriorityPlayer.usernameString);
		}

	}

	receivePassTurn(usernameString) {
		let player = this.getPlayerByName(usernameString);
		player.yieldThroughTurnBool = true;
		this.receivePassPriority(usernameString);
	}


	playCardFromHand(cardId) {
		console.log("playCardFromHand, cardId : " + cardId);
	}


}

module.exports = GameManager;