const Zone = require('../zone');

class Exile extends Zone {

	zoneName = "exile";

	constructor(cardsManager) {
		super(cardsManager);
	}
}
module.exports = Exile;