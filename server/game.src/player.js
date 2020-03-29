const Hand = require('./hand');

class Player {
	hand;
	constructor() {
		this.hand = new Hand();
	}
}

module.exports = Player;