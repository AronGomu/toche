const testSetManager = require('./testSet/testSetManager');

class CardsManager {

	allCardsArray;

	constructor() {
		this.allCardsArray = [];
		
		// testSet
		testSetManager.forEach(card => {
			this.allCardsArray.push(card);
		});
	}

	getCardById(idInt) {
		for (let i = 0; i < this.allCardsArray.length; i++) {
			if (this.allCardsArray[i].idInt == idInt) {
				return this.allCardsArray[i];
			};
		}
		throw new TypeError("From getCardById, cardsManager class has no card in allCardsArray which id correspond : " + idInt); 
	}

	getCardNameById(idInt) {
		for (let i = 0; i < this.allCardsArray.length; i++) {
			if (this.allCardsArray[i].idInt == idInt) {
				return this.allCardsArray[i].nameString;
			};
		}
		throw new TypeError("From getCardNameById, cardsManager class has no card in allCardsArray which id correspond : " + idInt); 
	}

}

module.exports = CardsManager;
