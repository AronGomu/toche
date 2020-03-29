const Player = require('./player');

class GameManager {
	players;
	constructor(user1, user2) {
		this.players = {};
		this.players[user1.username] = new Player(user1.username);
		this.players[user2.username] = new Player(user2.username);
		console.log(this.players);
	}
}

module.exports = GameManager;