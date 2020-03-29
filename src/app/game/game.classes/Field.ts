import { Card } from '../../classes/card'
export class Field {

		public cards: Card[];
		

		getStartingLife(): number {
      // Ca doit retourner la somme des 3 Héros, sinon 30 par défaut
      return 30;
    }
	

}