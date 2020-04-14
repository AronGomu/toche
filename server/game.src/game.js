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
		this.turn.activePlayer = this.playerArray[indexStartingPlayerNumber];
	}

	fetchGameState(username) {
		
		let data = {
			"currentPhaseString": null,
			"activePlayerUsernameString": null,

			'haveTurnBool': null,
			'havePriorityBool' : null,
			'isStackEmptyBool' : null,

			'myDeckArray' : null,
			'myHandArray' : null,

			'oppDeckArray' : null,
			'oppHandArray' : null,
		}

		this.playerArray.forEach(player => {
			if (username == player.usernameString) {
				data.currentPhaseString = this.turn.phase.phaseNameString;
				data.activePlayerUsernameString = this.turn.activePlayer.usernameString;

				data.haveTurnBool = player.haveTurnBool;
				data.havePriorityBool = player.havePriorityBool;
				data.isStackEmptyBool = this.isStackEmptyBool;

				data.myDeckArray = player.getDeck(false);
				data.myHandArray = player.getHand(true);
			}
			else {
				data.oppDeckArray = player.getDeck(false);
				data.oppHandArray = player.getHand(false);
			}
		});

		return data;
	}

	receivePassPhase(usernameString) {
		let player = this.getPlayerByName(usernameString);
		if (this.isStackEmptyBool == true && player.usernameString == this.turn.activePlayer.opponentPlayer.usernameString) {
			this.turn.nextPhase();
		}
		else {
			player.havePriorityBool = false;
    	player.opponentPlayer.havePriorityBool = true;
		}
	}



}

module.exports = GameManager;