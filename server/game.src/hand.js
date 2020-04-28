class Hand {
	cardArray;
	cardsManager
	constructor(cardsManager) {
		this.cardArray = [];
		this.cardsManager = cardsManager;
	}

	getCardArray(revealedBool) {
		if (revealedBool == true) {
			return this.cardArray;
		}
	
		let cardArrayLet = [];
		this.cardArray.forEach(card => {
			if (card.revealedBool == false) {
				cardArrayLet.push(this.cardsManager.getCardById(card.idInt).createCopy());
			}
			else {
				cardArrayLet.push(card);
			}
		});
		return cardArrayLet;
	}
}

module.exports = Hand;