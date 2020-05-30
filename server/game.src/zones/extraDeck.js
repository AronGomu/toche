const Zone = require('../zone');

class ExtraDeck extends Zone{

	zoneName = "extraDeck";

	constructor(player, cardsIdNumberArray, game) {
		super(player);
		cardsIdNumberArray.forEach(number => {
			this.cardArray.push(this.player.game.cardsManager.getCardById(number).createCopy(game,player,player));
		});
	}
}

module.exports = ExtraDeck;