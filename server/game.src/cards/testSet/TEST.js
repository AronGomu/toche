const Card = require("../../card");

class TEST extends Card {

	constructor() {
		super();
		this.idInt = 0;
		this.colorString = "blue";
		this.factionString = "Tempérant";
		this.nameString = "Médiatrice des éléments";
		this.levelInt = 0;
		this.manacostString = "U";
		this.typeStringArray = ["Creature"];
		this.archetypeStringArray = ["Inia"];
		this.subtypeStringArray = ["Inion"];
		this.attackInt = 4000;
		this.powerInt = 1;
		this.instantSpeedPlayableBool = true;
		this.imgUrlString = "TEST.png";
	}

	payCost(player) {
		console.log("IMPLEMENTATION SUCCESSFUL");
	}
}

module.exports = TEST;