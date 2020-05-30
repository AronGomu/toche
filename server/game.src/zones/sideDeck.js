const Zone = require('../zone');

class SideDeck extends Zone{

	zoneName = "sideDeck";

	constructor(player, cardsIdNumberArray, game) {
		super(player);
		cardsIdNumberArray.forEach(number => {
			this.cardArray.push(this.player.game.cardsManager.getCardById(number).createCopy(game,player,player));
		});
	}
}

module.exports = SideDeck;