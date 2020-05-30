class Cost {
	
	inGameIdCardPayingCostInt;
	playerPayingCostUsernameString; // targeted player (username or any)
	zoneStringArray; // targeted zones
	typeCardStringArray; // targeted types
	typeCostString; // how to pay cost
	selectedCardInGameIdInt = []; // all inGameId selected cards for paying this cost. Made for the client.

	constructor(inGameIdCardPayingCostInt, playerPayingCostUsernameString, zoneStringArray, typeCardStringArray, typeCostString) {

		// playerPayingCostUsernameString verification 
		if (inGameIdCardPayingCostInt != null) {
			this.inGameIdCardPayingCostInt = inGameIdCardPayingCostInt;
		} else {
			throw new Error("From Cost class : inGameIdInt passed in argument is null");
		}

		if (isInt(inGameIdCardPayingCostInt)) {
			this.inGameIdCardPayingCostInt = inGameIdCardPayingCostInt;
		} else {
			throw new Error("From Cost class : inGameIdInt passed in argument is not a number");
		}


		// playerPayingCostUsernameString verification 
		if (playerPayingCostUsernameString != null) {
			this.playerPayingCostUsernameString = playerPayingCostUsernameString;
		} else {
			throw new Error("From Cost class : playerPayingCostUsernameString passed in argument is null");
		}


		//zoneStringArray verification
		zoneStringArray.forEach(zoneString => {
			if (zoneString != "deck" && zoneString != "hand" && zoneString != "field" && zoneString != "graveyard" && zoneString != "exile" && zoneString != "extraDeck") {
				throw new Error("From Cost class : zoneString from zoneStringArray passed in argument is not a defined zone.\n" + 
				"zoneString : " + zoneString + "\n" +
				"zone available : deck, hand, field, graveyard, exile, extraDeck");
			}
		});
		this.zoneStringArray = zoneStringArray;
		
		// typeCardStringArray verification
		typeCardStringArray.forEach(typeCardString => {
			if (typeCardString != "Creature" && typeCardString != "Spell" && typeCardString != "Enchantment" && typeCardString != "Artifact" && typeCardString != "Hero" && typeCardString != "any") {
				throw new Error("From Cost class : typeCardStringArray passed in argument is not a defined type.\n" + 
					"typeCardStringArray : " + typeCardString + "\n" +
					"typeCard available : Creature, Spell, Enchantment, Artifact, Hero, any");
			}
		});
		this.typeCardStringArray = typeCardStringArray;

		// typeCostString verification
		if (typeCostString != "sacrifice" && typeCostString != "discard" && typeCostString != "mill" && typeCostString != "exile") {
			throw new Error("From Cost class : typeCardStringArray passed in argument is not a defined type.\n" + 
				"typeCostString : " + typeCostString + "\n" +
				"typeCost available : sacrifice, discard, mill, exile");
		}
		this.typeCostString = typeCostString;
	}
}

module.exports = Cost;

function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}