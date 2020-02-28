import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import cardsJson from '../../assets/cards.json'

@Component({
  selector: 'app-deckbuilder',
  templateUrl: './deckbuilder.component.html',
  styleUrls: ['./deckbuilder.component.scss']
})
export class DeckbuilderComponent implements OnInit {
  public cardsInSearchView;
  public decklist;
  public searched;
  public deckJson;
  public allDecks;

  constructor(private _http: HttpClient) { 
    this.cardsInSearchView = cardsJson;
    this.searched = '';
    this.decklist = [];
    this.deckJson = {
      oldname: "",
      name : "",
      cards : []
    }
    this.getDecks(true);

  }

  ngOnInit(): void {

  }

  saveDeck() {
    this._http.post<any>('http://localhost:3000/saveDeck', this.deckJson).subscribe((res) => {console.log("Response saveDeck : ");console.log(res);this.followingSaveDeck();});
  }

  followingSaveDeck() {

    // Saving current list in allDecks
    for (let i = 0; i < this.allDecks.length; i++) {
      if (this.allDecks[i].name == this.deckJson.oldname) {
        this.allDecks[i] = this.deckJson;
      }
    }

    this.deckJson.oldname = this.deckJson.name;
  }

  deleteDeck() {
    this._http.post<any>('http://localhost:3000/deleteDeck', this.deckJson).subscribe((res) => {console.log("Response deleteDeck : ");console.log(res); this.followingDeleteDeck();});
  }

  newDeck() {
    let newDeck = {
      oldname: "",
      name: "",
      cards: []
    }
    this.allDecks.push(newDeck);
    this.deckJson = this.allDecks[this.allDecks.length-1];
  }

  followingDeleteDeck() {
    for (let i = 0; i < this.allDecks.length; i++) {
      if (this.allDecks[i].name == this.deckJson.name) {
        this.allDecks.splice(i,1);
        if (this.allDecks.length > 0) {
          this.deckJson = this.allDecks[i];
          this.decklist = this.allDecks[i].cards;
        }
        else {
          this.setDeckJson(null, null, [], true);
        }
        break;
      }
    }
  }

  getDecks(firstLoad: boolean) {
    this._http.get<any>("http://localhost:3000/getDecks").subscribe((res) => {console.log("Response getDecks : ");console.log(res); this.setAllDecks(res, firstLoad)});
  }

  setDeckJson(oldname: string, name: string, cards, modifyDecklist: boolean) {
    this.deckJson.oldname = oldname;
    this.deckJson.name = name;
    this.deckJson.cards = cards;
    if (modifyDecklist == true) {
      this.decklist = cards;
    }
  }

  setAllDecks(res, firstLoad: boolean) {
    this.allDecks = res.decks;
    if (firstLoad == true) {
      this.setDeckJson(res.currentDeck.name,res.currentDeck.name,res.currentDeck.cards, true);
    }
  }

  deckSelected(event) {
    for (let i = 0; i < this.allDecks.length; i++) {
      if (this.allDecks[i].name == event.target.value) {
        this.deckJson = this.allDecks[i];
        this.decklist = this.deckJson.cards;
        //this.setDeckJson(this.allDecks[i].name,this.allDecks[i].name,this.allDecks[i].cards, true);
        break;
      } 
    }
  }

  searchCardsByText(word: string) {
    this.cardsInSearchView = [];
    cardsJson.forEach(element => {
      if (element.name.toLowerCase().search(word.toLowerCase()) != -1) {
        this.cardsInSearchView.push(element);
      }
    });
  }

  onKeySearchByText(event: any) {
    this.searched = event.target.value;
    this.searchCardsByText(this.searched);
  }

  onKeyDeckName(event: any) {
    this.deckJson.name = event.target.value;
  }

  getCardById(id: number) {
    for (let i = 0; i < cardsJson.length; i++) {
      if (cardsJson[i].id == id) {
        return cardsJson[i];
      }
    }
    return false;
  }

  sortDeckById() {
    let sortedDeck = [];
    for (let i = 0; i< this.decklist.length; i++) {
      if (sortedDeck.length < 1) {
        sortedDeck.push(this.decklist[i]);
      }
      else {
        for (let j = 0; j < sortedDeck.length; j++) {
          if (this.decklist[i].id < sortedDeck[j].id) {
            sortedDeck.splice(j,0,this.decklist[i]);
            break;
          }
          else if (j == (sortedDeck.length)-1) {
            sortedDeck.push(this.decklist[i]);
            break;
          }
        }
      }
    }
    this.decklist = sortedDeck;
  }

  addCardToDecklist(event: any) {
    let cardToAdd = this.getCardById(event.target.id);
    if (cardToAdd) {
      this.decklist.push(cardToAdd);
      this.deckJson.cards.push(cardToAdd);
      this.sortDeckById();
    }
    else {
      console.error("NO CARD CORRESPOND TO THE GIVEN ID : " + event.target.id);
    }
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
  }

  debug() {
    console.log(this.deckJson.cards);
  }

}
