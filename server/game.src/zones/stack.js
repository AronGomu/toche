const Zone = require('../zone');

class Stack extends Zone {

	zoneName = "stack";

	constructor(cardsManager) {
		super(cardsManager);
	}
}
module.exports = Stack;