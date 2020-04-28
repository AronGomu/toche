const Manapool = require('./manapool');
const Deck = require('./deck');
const Hand = require('./hand');

class Player {

	cardsManager;

	usernameString;

	lifeNumber;
	manapool;
	levelPointPoolNumber;

	deck;
	hand;
	field;
	
	opponentPlayer;

	haveTurnBool = false;
	havePriorityBool = false;
	yieldThroughTurnBool = false;

	constructor(cardsManager, usernameString, deck) {
		this.cardsManager = cardsManager;
		this.usernameString = usernameString;
		this.manapool = new Manapool();
		this.hand = new Hand(this.cardsManager);
		this.deck = new Deck(deck.cards, this.cardsManager);
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

	checkAllPayableCards(turn, isStackEmptyBool, zoneCardArray) {
		zoneCardArray.forEach(card => {
			if (turn.checkIfPlayable(card, isStackEmptyBool, this.havePriorityBool) == true) {
				if (this.manapool.checkIfPayable(card.manacostString) == true) {
					card.playableBool = true;
					//console.log("Card is payable");
				}
				else {
					card.playableBool = false;
					//console.log("Card is not payable");
				}
			}
			else {
				card.playableBool = false;
				//console.log("Card is not playable");
			}
		});
	}

	checkAllPayableCardsAllZones(turn, isStackEmptyBool) {
		this.checkAllPayableCards(turn, isStackEmptyBool, this.deck.cardArray, this.havePriorityBool);
		this.checkAllPayableCards(turn, isStackEmptyBool, this.hand.cardArray, this.havePriorityBool);
	}
}

module.exports = Player;