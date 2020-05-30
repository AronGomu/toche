class Card {
	
	class = "card";

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

	inGameIdInt;
	controllerPlayerUsernameString;
	ownerPlayerUsernameString;
	playableBool;
	selectableBool;
	selectedBool;
	hiddenFromOwnerBool;
	hiddenFromOwnerOpponentBool;
	

	constructor(card) {
		if (this.class != "card") {
			if (this.getCostToPlayCard === undefined) {
				throw new Error("getCostToPlayCard function not implemented")
			}
			if (this.payCostToPlayCard === undefined) {
				throw new Error("payCostToPlayCard function not implemented")
			}
			if (this.resolvePlayCard === undefined) {
				throw new Error("resolvePlayCard function not implemented")
			}
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

			this.inGameIdInt = null;
			this.controllerPlayerUsernameString = null;
			this.ownerPlayerUsernameString = null;
			this.playableBool = false;
			this.selectableBool = false;
			this.selectedBool = false;
			this.hiddenFromOwnerBool = true;
			this.hiddenFromOwnerOpponentBool = true;
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
			
			this.inGameIdInt = card.inGameIdInt;
			this.controllerPlayerUsernameString = card.controllerPlayerUsernameString;
			this.ownerPlayerUsernameString = card.ownerPlayerUsernameString;
			this.playableBool = card.playableBool;
			this.selectableBool = card.selectableBool;
			this.selectedBool = card.selectedBool;
			this.hiddenFromOwnerBool = card.hiddenFromOwnerBool;
			this.hiddenFromOwnerOpponentBool = card.hiddenFromOwnerOpponentBool;
		}
	}

	createCopy(game,ownerPlayer, controllerPlayer) {
		let card = this;
		card.inGameIdInt = game.generateInGameId();
		card.ownerPlayerUsernameString = ownerPlayer.usernameString;
		card.controllerPlayerUsernameString = controllerPlayer.usernameString;
		return new Card(card);
	}

	getHidden() {
		let card = new Card();
		card.inGameIdInt = this.inGameIdInt;
		card.imgUrlString = "cardback.png";
		card.ownerPlayerUsernameString = this.ownerPlayerUsernameString;
		card.controllerPlayerUsernameString = this.controllerPlayerUsernameString;
		return new Card(card);
	}




	getCostToPlayCardDefault(player) {
		throw new Error('You have to implement the method getCostToPlayCard!');
		// 2 return type possible
		// First : a list of all the cost to pay that need the player to select manually
		// Second : null, no cost to pay
	};

	// return null by default
	payCostToPlayCardDefault(game, costsCompleted) {
		return null;
	}

	resolvePlayCardDefault(game,card) {
		console.log("Launch resolve card");
		card.hiddenFromOwnerBool = false;
		card.hiddenFromOwnerOpponentBool = false;
		let playerControllingTheCard = game.getPlayerByName(card.controllerPlayerUsernameString);
		console.log(playerControllingTheCard);
		playerControllingTheCard.field.cardArray.push(game.stack.cardArray.pop());
	}

}

module.exports = Card;