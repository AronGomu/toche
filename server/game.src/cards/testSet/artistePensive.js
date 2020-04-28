const Card = require("../../card");

class ArtistePensive extends Card {

	constructor() {
		super();
		this.idInt = 1;
		this.colorString = "blue";
		this.factionString = "Tempérant";
		this.nameString = "Artiste Pensive";
		this.manacostString = "U";
		this.typeStringArray = ["Creature"];
		this.archetypeStringArray = ["Inia"];
		this.subtypeStringArray = ["Inion"];
		this.attackInt = 2000;
		this.powerInt = 1;
		this.instantSpeedPlayableBool = false;
		this.imgUrlString = "Artiste Pensive.jpg";

	}
}

module.exports = ArtistePensive;