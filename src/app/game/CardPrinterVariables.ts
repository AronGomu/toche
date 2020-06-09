
export class CardPrinterVariables {

		setManacostVerifierBoolArray(manacost: string) {
			let manacostVerifierBoolArray = [];
			for (let i = 0; i < manacost.length; i++) {
				if (manacost[i] === "U") manacostVerifierBoolArray.push({"inco":false,"blue":true,"purple":false,"green":false,"number":1});
				else if (manacost[i] === "P") manacostVerifierBoolArray.push({"inco":false,"blue":true,"purple":false,"green":false,"number":1});
				else if (manacost[i] === "G") manacostVerifierBoolArray.push({"inco":false,"blue":true,"purple":false,"green":false,"number":1});
				else manacostVerifierBoolArray.push({"inco":true,"blue":true,"purple":false,"green":false,"number":manacost[i]});
			}
			return manacostVerifierBoolArray;
		}
		


}