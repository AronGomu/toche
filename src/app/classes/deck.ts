import { Card } from './card'
export class Deck {

    public oldname: string;
    public name: string;
    public cards: Card[];
    public selected: boolean;

    constructor(oldname: string, name: string, cards, selected: boolean) {
      this.oldname = oldname;
      this.name = name;
      this.cards = cards;
      this.selected = selected;
    }

    setDeck(oldname: string, name: string, cards, selected: boolean) {
      this.oldname = oldname;
      this.name = name;
      this.cards = cards;
      this.selected = selected;
    }

}