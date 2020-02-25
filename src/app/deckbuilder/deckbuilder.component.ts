import { Component, OnInit } from '@angular/core';

import cardsJson from '../../assets/cards.json'

@Component({
  selector: 'app-deckbuilder',
  templateUrl: './deckbuilder.component.html',
  styleUrls: ['./deckbuilder.component.scss']
})
export class DeckbuilderComponent implements OnInit {

  public cards;
  public decklist;
  public searched;

  constructor() { 
    console.log('Reading local json files');
    console.log(cardsJson);
    this.cards = cardsJson;
    this.searched = '';
    this.decklist = [];
  }

  ngOnInit(): void {
  }

  searchCardsByText(word: string) {
    this.cards = [];
    cardsJson.forEach(element => {
      if (element.name.toLowerCase().search(word.toLowerCase()) != -1) {
        this.cards.push(element);
      }
    });
  }

  onKeySearchByText(event: any) {
    this.searched = event.target.value;
    this.searchCardsByText(this.searched);
  }

  addCardToDecklist(event: any) {
    let cardToAdd = this.getCardById(event.target.id);
    if (cardToAdd) {
      this.decklist.push(cardToAdd);
      console.log(this.decklist);
    }
    else {
      console.error("NO CARD CORRESPOND TO THE GIVEN ID : " + event.target.id);
    }
  }

  getCardById(id: number) {
    for (let i = 0; i < cardsJson.length; i++) {
      if (cardsJson[i].id == id) {
        return cardsJson[i];
      }
    }
    return false;
  }

  removeCardFromDecklist(event) {
    console.log(event.target);
    for (let i = 0; i < this.decklist.length; i++) {
      if (this.decklist[i].id == event.target.id) {
        this.decklist.splice(i, 1);
      }
      
    }
  }

}
