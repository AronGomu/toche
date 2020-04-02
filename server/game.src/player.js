const Deck = require('./deck');
const Hand = require('./hand');

class Player {
	usernameString;
	deck;
	hand;
	constructor(usernameString, deck) {
		this.usernameString = usernameString;
		this.hand = new Hand();
		this.deck = new Deck(deck.cards);
	}

	draw(numberOfTimes) {
		for (let i = 0; i < numberOfTimes; i++) {
			if (this.deck.cardArray.length == 0) {
				return false;
			}
			this.hand.cardArray.push(this.deck.cardArray.pop());
		}
		return true;
	}

	getDeck(revealedBool) {
		return this.deck.getCardArray(revealedBool);
	}

	getHand(revealedBool) {
		return this.hand.getCardArray(revealedBool);
	}
}

module.exports = Player;