const Card = require('./card');

class Hand {
	cardArray;
	constructor() {
		this.cardArray = [];
	}

	getCardArray(revealedBool) {
		if (revealedBool == true) {
			return this.cardArray;
		}
	
		let cardArrayLet = [];
		this.cardArray.forEach(card => {
			if (card.revealedBool == false) {
				cardArrayLet.push(new Card());
			}
			else {
				cardArrayLet.push(card);
			}
		});
		return cardArrayLet;
	}
}

module.exports = Hand;