const Zone = require('./../zone');

class Deck extends Zone{

	zoneName = "deck";

	constructor(player, cardsIdNumberArray, game) {
		super(player);

		console.log(cardsIdNumberArray);

		cardsIdNumberArray.forEach(number => {
			this.cardArray.push(this.player.game.cardsManager.getCardById(number).createCopy(game,player,player));
			console.log("name from hand from " + player.usernameString + " : " + this.cardArray[this.cardArray.length-1].nameString + ", " + this.cardArray[this.cardArray.length-1].hiddenFromOwnerBool + ", " + this.cardArray[this.cardArray.length-1].hiddenFromOwnerOpponentBool);
		});
	}

		/**
	 * Shuffles array in place.
	 * @param {Array} a items An array containing the items.
	 */
	shuffle() {
		if (this.cardArray == null || this.cardArray.length == 0) {
			return;
		}

		var j, x, i;
		for (i = this.cardArray.length - 1; i > 0; i--) {
				j = Math.floor(Math.random() * (i + 1));
				x = this.cardArray[i];
				this.cardArray[i] = this.cardArray[j];
				this.cardArray[j] = x;
				this.cardArray[j].hiddenFromOwnerBool = true;
				this.cardArray[j].hiddenFromOwnerOpponentBool = true;
		}
	}
}

module.exports = Deck;