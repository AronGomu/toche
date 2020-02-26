import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  public deckJson;
  public allDecks;

  constructor(private _http: HttpClient) { 
    this.cards = cardsJson;
    this.searched = '';
    this.decklist = [];
    this.deckJson = {
      name : "",
      cards : []
    }
    this.allDecks = this.getDecks();
    console.log(this.allDecks);

  }

  ngOnInit(): void {

  }

  saveDeck(event) {
    this.deckJson.name = event.target[0].value; // Input must be at index 0 to work)
    this._http.post<any>('http://localhost:3000/saveDeck', this.deckJson).subscribe((res) => {console.log(res);});

  }

  getDecks() {
    return this._http.get<any>("http://localhost:3000/getDecks").subscribe((res) => {console.log(res);});
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

  getCardById(id: number) {
    for (let i = 0; i < cardsJson.length; i++) {
      if (cardsJson[i].id == id) {
        return cardsJson[i];
      }
    }
    return false;
  }

  addCardToDecklist(event: any) {
    let cardToAdd = this.getCardById(event.target.id);
    if (cardToAdd) {
      this.decklist.push(cardToAdd);
      this.deckJson.cards.push(parseInt(event.target.id));
    }
    else {
      console.error("NO CARD CORRESPOND TO THE GIVEN ID : " + event.target.id);
    }
    console.log(this.deckJson);
  }

  removeCardFromDecklist(event) {
    let cardRemoved = false;
    for (let i = 0; i < this.decklist.length; i++) {
      if (this.decklist[i].id == event.target.id) {
        this.decklist.splice(i, 1);
        cardRemoved = true;
        break;
      }
    }
    if (cardRemoved == true) {
      for (let i = 0; i < this.deckJson.cards.length; i++) {
        if (this.deckJson.cards[i] == event.target.id) {
          this.deckJson.cards.splice(i, 1);
          break;
        }
      }
    }
    console.log(this.deckJson);
  }

}
