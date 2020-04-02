const Player = require('./player');

class GameManager {
	playerArray = [];
	constructor(data,deck1, deck2) {
		this.playerUsernameList == [data.myself.username,data.opponent.username];
		this.playerArray.push(new Player(data.myself.username, deck1));
		this.playerArray.push(new Player(data.opponent.username, deck2));


	}

	initializeGame() {
		this.playerArray.forEach(player => {
			player.deck.shuffle();
			player.draw(5);
		});
	}

	getGameState(username) {
		
		let data = {
			'myDeckArray' : null,
			'myHandArray' : null,
			'oppDeckArray' : null,
			'oppHandArray' : null,
		}

		this.playerArray.forEach(player => {
			if (username == player.usernameString) {
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

}

module.exports = GameManager;