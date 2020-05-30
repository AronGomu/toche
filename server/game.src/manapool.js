const Card = require('./card');

class Manapool {
	
	player;

	colorlessManaInt;
	blueManaInt;
	blackManaInt;

	
	constructor(player) {
		this.player = player;
		this.colorlessManaInt = 0;
		this.blueManaInt = 0;
		this.blackManaInt = 0;
	}

	addMana(manaString) {

		for(let i = 0 ; i < manaString.length ; i++){
			if (!isNaN(parseInt(manaString.charAt(i)))) {
				this.colorlessManaInt += parseInt(manaString.charAt(i));
			}

			if (manaString.charAt(i) == "U") {
				this.blueManaInt++;
			}

			if (manaString.charAt(i) == "B") {
				this.blackManaInt++;
			}
		}
	}

	subMana(manaString) {
		for (let i = 0 ; i < manaString.length ; i++){
			if (!isNaN(parseInt(manaString.charAt(i)))) {
				if (this.colorlessManaInt > 0) {
					this.colorlessManaInt += parseInt(manaString.charAt(i));
				}
				else {
					return false;
				}
			}

			if (manaString.charAt(i) == "U") {
				if (this.blueManaInt > 0) {
					this.blueManaInt--;
				}
				else {
					return false;
				}
			}

			if (manaString.charAt(i) == "B") {
				if (this.blackManaInt > 0) {
					this.blackManaInt--;
				}
				else {
					return false;
				}
			}
		}
		return true;
	}

	checkIfPayable(manaString) {

		if (manaString == "") return true;

		let toCheckColorlessManaInt = 0;
		let toCheckBlueManaInt = 0;
		let toCheckBlackManaInt = 0;

		let tempColorlessManaInt = this.colorlessManaInt;
		let tempBlueManaInt = this.blueManaInt;
		let tempBlackManaInt = this.blackManaInt;

		for (let i = 0 ; i < manaString.length ; i++){
			if (!isNaN(parseInt(manaString.charAt(i)))) {
				toCheckColorlessManaInt += parseInt(manaString.charAt(i));
			}

			if (manaString.charAt(i) == "U") {
				toCheckBlueManaInt++;
			}

			if (manaString.charAt(i) == "B") {
				toCheckBlackManaInt++;
			}
		}

		// Verification for colored mana first

		/*
		console.log("BEFORE");
		console.log("tempBlackManaInt : " + tempBlackManaInt);
		console.log("toCheckBlackManaInt : " + toCheckBlackManaInt);
		console.log("tempBlackManaInt : " + tempBlackManaInt);
		console.log("tempBlueManaInt : " + tempBlueManaInt);
		*/
		tempBlackManaInt -= toCheckBlackManaInt;
		tempBlueManaInt -= toCheckBlueManaInt;

		/*
		console.log("AFTER");
		console.log(tempBlackManaInt);
		console.log(tempBlueManaInt);
		*/

		if (tempBlackManaInt < 0 || tempBlueManaInt < 0) {
			//console.log("Pas assez de source coloré pour payer le cout");
			return false;
		}


		let tempAllManaLeftInt = tempColorlessManaInt + tempBlackManaInt + tempBlueManaInt

		tempAllManaLeftInt -= toCheckColorlessManaInt;

		if (tempAllManaLeftInt < 0) {
			//console.log("Pas assez de source de mana pour payer le cout");
			return false;
		}

		return true;
	}

}

module.exports = Manapool;