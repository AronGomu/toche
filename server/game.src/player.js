const Manapool = require('./manapool');
const Deck = require('./zones/deck');
const ExtraDeck = require('./zones/extraDeck')
const SideDeck = require('./zones/sideDeck')
const Hand = require('./zones/hand');
const Field = require('./zones/field');
const Graveyard = require('./zones/graveyard');
const Exile = require('./zones/exile')


class Player {

	game;

	usernameString;

	lifeNumber;
	manapool;
	levelPointPoolNumber;

	deck;
	extraDeck;
	sideDeck;
	hand;
	field;
	graveyard;
	exile;
	
	opponentPlayer;

	haveTurnBool = false;
	havePriorityBool = false;
	yieldThroughTurnBool = false;


	constructor(game, usernameString, decks) {
		this.game = game;
		this.usernameString = usernameString;
		this.manapool = new Manapool(this);

		this.deck = new Deck(this, decks.deck, game);
		this.extraDeck = new ExtraDeck(this, decks.extraDeck, game);
		this.sideDeck = new SideDeck(this, decks.sideDeck, game);

		this.hand = new Hand(this);
		this.field = new Field(this);
		this.graveyard = new Graveyard(this);
		this.exile = new Exile(this);
	}

	draw(numberOfTimes) {
		for (let i = 0; i < numberOfTimes; i++) {

			// Verification of the player has no card in deck
			if (this.deck.cardArray.length == 0) {
				return false;
			}
			let card = this.deck.cardArray.pop();
			
			card.hiddenFromOwnerBool = false;
			this.hand.cardArray.push(card);
		}
		return true;
	}

	getDeck(isMeBool) {
		return this.deck.getCardArray(this, isMeBool);
	}
	getExtraDeck(isMeBool) {
		return this.extraDeck.getCardArray(this, isMeBool);
	}
	getSideDeck(isMeBool) {
		return this.sideDeck.getCardArray(this, isMeBool);
	}
	getHand(isMeBool) {
		return this.hand.getCardArray(this, isMeBool);
	}
	getField(isMeBool) {
		return this.field.getCardArray(this, isMeBool);
	}
	getGraveyard(isMeBool) {
		return this.graveyard.getCardArray(this, isMeBool);
	}
	getExile(isMeBool) {
		return this.exile.getCardArray(this, isMeBool);
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