
export class CardPrinterVariables {

	// CARD PREVIEW IN GAME

		public cardToPreview;

		public originalCardHeight: number = 1047;
		public originalCardWidth: number = 747;

		public cardPreviewHeight: number = this.originalCardHeight/2;
		public cardPreviewWidth: number = this.originalCardWidth/2;

		public cardNamePaddingBottomPreview: number = this.cardPreviewHeight/100*4;
		public cardNamePaddingRightPreview: number = this.cardPreviewWidth/100*25;

		public typesPaddingBottomPreview: number = this.cardPreviewHeight/1000*725;
		public typesPaddingRightPreview: number = this.cardPreviewWidth/1000*125;

		public artistNamePaddingBottomPreview: number = this.cardPreviewHeight/1000*950;
		public artistNamePaddingRightPreview: number = this.cardPreviewWidth/1000*50;
		
		
	// NORMAL CARDS IN GAMES

		public imgHeight: number;
		public imgWidth: number;

		public cardHeight: number;
		public cardWidth: number;

		public cardNamePaddingRight: number;
		public cardNamePaddingBottom: number;



		setManacostVerifierBoolArray(manacost: string) {
			let manacostVerifierBoolArray = [];
			for (let i = 0; i < manacost.length; i++) {
				if (manacost[i] === "U") manacostVerifierBoolArray.push({"inco":false,"blue":true,"purple":false,"green":false,"number":1});
				else if (manacost[i] === "P") manacostVerifierBoolArray.push({"inco":false,"blue":false,"purple":true,"green":false,"number":1});
				else if (manacost[i] === "G") manacostVerifierBoolArray.push({"inco":false,"blue":false,"purple":false,"green":true,"number":1});
				else manacostVerifierBoolArray.push({"inco":true,"blue":false,"purple":false,"green":false,"number":manacost[i]});
			}
			return manacostVerifierBoolArray;
		}
		


}