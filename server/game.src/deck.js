const Card = require('./card');

class Deck {
	cardArray;
	constructor(cardArray) {
		this.cardArray = [];
		cardArray.forEach(card => {
			this.cardArray.push(new Card(card));
		});
	}

		/**
	 * Shuffles array in place.
	 * @param {Array} a items An array containing the items.
	 */
	shuffle() {
		if (this.cardArray == null || this.cardArray.length == 0) {
			return;
		}

		var j, x, i;
		for (i = this.cardArray.length - 1; i > 0; i--) {
				j = Math.floor(Math.random() * (i + 1));
				x = this.cardArray[i];
				this.cardArray[i] = this.cardArray[j];
				this.cardArray[j] = x;
				this.cardArray[j].revealedBool = false;
		}
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

module.exports = Deck;