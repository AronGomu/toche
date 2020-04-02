class Card {
	
	idInt;
  colorString;
  factionString;
  nameString;
  manacostString;
  typeStringArray;
  archetypeStringArray;
  subtypeStringArray;
  attackInt;
  powerInt;
	imgUrlString;
	revealedBool;

	constructor(card) {

		if (card === undefined) {
			this.idInt = null;
			this.colorString = null;
			this.factionString = null;
			this.nameString = null;
			this.manacostString = null;
			this.typeStringArray = null;
			this.archetypeStringArray = null;
			this.subtypeStringArray = null;
			this.attackInt = null;
			this.powerInt = null;
			this.imgUrlString = null;
		}

		else {
			this.idInt = card.id;
			this.colorString = card.color;
			this.factionString = card.faction;
			this.nameString = card.name;
			this.manacostString = card.manacost;
			this.typeStringArray = card.type;
			this.archetypeStringArray = card.archetype;
			this.subtypeStringArray = card.subtype;
			this.attackInt = card.attack;
			this.powerInt = card.power;
			this.imgUrlString = card.imgUrl;
		}

		this.revealedBool = false;
	}
}

module.exports = Card;