const Zone = require('./../zone');

class Field extends Zone {

	zoneName = "field";

	constructor(cardsManager) {
		super(cardsManager);
	}
}
module.exports = Field;