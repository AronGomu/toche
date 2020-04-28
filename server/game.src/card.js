class Card {
	
	idInt;
  colorString;
  factionString;
	nameString;
	levelInt;
  manacostString;
  typeStringArray;
  archetypeStringArray;
  subtypeStringArray;
  attackInt;
	powerInt;
	instantSpeedPlayableBool;
	imgUrlString;
	revealedBool;
	playableBool;

	constructor(card) {

		/*
		if (this.constructor === Card) {
			//throw new TypeError('Abstract class "Widget" cannot be instantiated directly.'); 
		}
		*/

		if (this.payCost === undefined) {
				throw new TypeError('Class miss payCost function');
		}

		if (card === undefined) {
			this.idInt = null;
			this.colorString = null;
			this.factionString = null;
			this.nameString = null;
			this.levelInt = null;
			this.manacostString = null;
			this.typeStringArray = null;
			this.archetypeStringArray = null;
			this.subtypeStringArray = null;
			this.attackInt = null;
			this.powerInt = null;
			this.instantSpeedPlayableBool = null;
			this.imgUrlString = null;
			this.revealedBool = false;
			this.playableBool = false;
		}

		else {
			this.idInt = card.idInt;
			this.colorString = card.colorString;
			this.factionString = card.factionString;
			this.nameString = card.nameString;
			this.levelInt = card.levelInt;
			this.manacostString = card.manacostString;
			this.typeStringArray = card.typeStringArray;
			this.archetypeStringArray = card.archetypeStringArray;
			this.subtypeStringArray = card.subtypeStringArray;
			this.attackInt = card.attackInt;
			this.powerInt = card.powerInt;
			this.instantSpeedPlayableBool = card.instantSpeedPlayableBool;
			this.imgUrlString = card.imgUrlString;
			this.revealedBool = card.revealedBool;
			this.playableBool = card.playableBool;
		}
	}

	createCopy() {
		return new Card(this);
	}

	getHidden() {
		return new Card();
	}


	payCost(player) {
		throw new Error('You have to implement the method payCost!');
	};

}

module.exports = Card;