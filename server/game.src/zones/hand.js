const Zone = require('./../zone');

class Hand extends Zone {

	zoneName = "hand";

	constructor(cardsManager) {
		super(cardsManager);
	}
}
module.exports = Hand;