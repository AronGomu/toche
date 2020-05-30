const Card = require("../../card");
const Cost = require("../../cost");

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

	
	getCostToPlayCard(player) {
		return [new Cost(this.inGameIdInt, player.usernameString,["hand"],["any"],"discard"),
						new Cost(this.inGameIdInt, player.usernameString,["hand"],["any"],"discard")];
	}
	

	payCostToPlayCard(game, costCompleted) {

		console.log("costCompleted");
		console.log(costCompleted);

		// Both player from both cost are the same. We're using the first cost to set everything.
		let player = game.getPlayerByName(costCompleted[0].playerPayingCostUsernameString);

		// Moving the discarded card from hand to grave from the player playing the card
		for (let i = 0; i < costCompleted.length; i++) {
			for (let j = 0; j < player.hand.cardArray.length; j++) {
				if (player.hand.cardArray[j].inGameIdInt == costCompleted[i].selectedCardInGameIdInt) {
					player.graveyard.cardArray.push(player.hand.cardArray[j]);
					player.hand.cardArray.splice(j, 1);
				}
			}	
		}

		// Put the card played from the stack onto the field
		for (let i = 0; i < game.stack.cardArray.length; i++) {
			if (game.stack.cardArray[i].inGameIdInt == costCompleted[0].inGameIdCardPayingCostInt) {
				player.field.push(game.stack.cardArray[i]);
				game.stack.cardArray[i].splice(i,1);
			}
		}
	}

	resolvePlayCard(game, card) {
		super.resolvePlayCardDefault(game,card);
	}
}

module.exports = TEST;