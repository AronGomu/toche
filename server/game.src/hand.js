const Card = require('./card');

class Hand {
	cardArray;
	constructor() {
		this.cardArray = [];
	}

	getCardArray(revealedBool) {
		console.log(revealedBool);
		if (revealedBool == true) {
			console.log(this.cardArray);
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