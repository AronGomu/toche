const Zone = require('./../zone');

class Graveyard extends Zone {

	zoneName = "graveyard";

	constructor(cardsManager) {
		super(cardsManager);
	}
}
module.exports = Graveyard;