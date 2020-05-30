class Zone {

	player;

	zoneName;
	cardArray;
	constructor(player) {
		this.player = player;
		this.cardArray = [];
	}

	getCardArray(player, isMeBool) {

		let cardArrayToReturn = [];

		this.cardArray.forEach(card => {
			/*
			if (this.zoneName == 'hand') {
				console.log("name from hand from " + player.usernameString + " : " + card.nameString + ", " + card.hiddenFromOwnerBool + ", " + card.hiddenFromOwnerOpponentBool);
			}
			*/

			if (isMeBool == true) {
				if (card.hiddenFromOwnerBool == true) {
					cardArrayToReturn.push(card.getHidden());
				} else {
					cardArrayToReturn.push(card);
				}
			} else if (isMeBool == false) {
				if (card.hiddenFromOwnerOpponentBool == true) {
					cardArrayToReturn.push(card.getHidden());
				} else {
					cardArrayToReturn.push(card);
				}
			}
		});

		return cardArrayToReturn;
	}
}

module.exports = Zone;