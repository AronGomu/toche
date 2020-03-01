import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

import cardsJson from '../../assets/cards.json'
import { GlobalConstants } from './../common/global-constant';

@Component({
  selector: 'app-deckbuilder',
  templateUrl: './deckbuilder.component.html',
  styleUrls: ['./deckbuilder.component.scss']
})
export class DeckbuilderComponent implements OnInit {

  public globals;

  public cardsInSearchView;
  public decklist;
  public searched;
  public allDecks;

  public deckJson;

  setDeckJson(oldname: string, name: string, cards, selected: boolean) {
    this.deckJson.oldname = oldname;
    this.deckJson.name = name;
    this.deckJson.cards = cards;
    this.deckJson.selected = selected;
  }

  constructor(private _http: HttpClient, private _router: Router) { 

    if (GlobalConstants.username == null) {
      this._router.navigate(['login'], {replaceUrl: true});
      return;
    }

    this.globals = GlobalConstants;
    this.cardsInSearchView = cardsJson;
    this.searched = '';
    this.deckJson = {
      oldname: "",
      name : "",
      cards : [],
      selected : null
    }
    this.getDecks();

  }

  ngOnInit(): void {

  }

  saveDeck() {
    this._http.post<any>(GlobalConstants.apiURL + '/saveDeck', this.deckJson).subscribe((res) => {console.log("Response saveDeck : ");console.log(res);this.followingSaveDeck();});
  }

  followingSaveDeck() {

    // Saving current list in allDecks
    for (let i = 0; i < this.allDecks.length; i++) {
      if (this.allDecks[i].name == this.deckJson.oldname) {
        this.allDecks[i] = this.deckJson;
      }
    }

    this.deckJson.oldname = this.deckJson.name;

    if (this.allDecks.length < 1) {
      this.allDecks.push(this.deckJson);
    }
  }

  deleteDeck() {
    this._http.post<any>(GlobalConstants.apiURL +  '/deleteDeck', this.deckJson).subscribe((res) => {console.log("Response deleteDeck : ");console.log(res); this.followingDeleteDeck();});
  }

  newDeck() {
    console.log("New Deck");
    this.setDeckJson("", "", [], true);
    this.allDecks.push(this.deckJson);
    this.defineSelectedForAllDecks();
    console.log(this.deckJson);

  }

  followingDeleteDeck() {
    for (let i = 0; i < this.allDecks.length; i++) {
      if (this.allDecks[i].name == this.deckJson.name) {
        this.allDecks.splice(i,1);
        if (this.allDecks.length > 0) {
          this.deckJson = this.allDecks[i];
        }
        else {
          this.setDeckJson(null, null, [], true);
        }
        break;
      }
    }
    console.log(this.deckJson);
    this.setCurrent();
  }

  getDecks() {
    this._http.get<any>(GlobalConstants.apiURL + '/getDecks').subscribe((res) => {console.log("Response getDecks : ");console.log(res); this.followingGetDecks(res)});
  }

  followingGetDecks(res) {
    this.allDecks = res.decks;
    if (this.allDecks.length > 0) {
      this.setDeckJson(res.currentDeck.name,res.currentDeck.name,res.currentDeck.cards, true);
      this.defineSelectedForAllDecks();
    } else {
      this.setDeckJson("", "", [],true);
    }
  }

  setCurrent() {
    this._http.post<any>(GlobalConstants.apiURL + '/setCurrent', this.deckJson).subscribe((res) => {console.log("Response setCurrent : ");console.log(res);});
  }

  defineSelectedForAllDecks() {
    this.allDecks.forEach(element => {
      if (element.name == this.deckJson.name) {
        element.selected = true;
      }
      else {
        element.selected = false;
      }
    });
  }

  deckSelected(event) {
    for (let i = 0; i < this.allDecks.length; i++) {
      if (this.allDecks[i].name == event.target.value) {
        this.deckJson = this.allDecks[i];
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
    for (let i = 0; i< this.deckJson.cards.length; i++) {
      if (sortedDeck.length < 1) {
        sortedDeck.push(this.deckJson.cards[i]);
      }
      else {
        for (let j = 0; j < sortedDeck.length; j++) {
          if (this.deckJson.cards[i].id < sortedDeck[j].id) {
            sortedDeck.splice(j,0,this.deckJson.cards[i]);
            break;
          }
          else if (j == (sortedDeck.length)-1) {
            sortedDeck.push(this.deckJson.cards[i]);
            break;
          }
        }
      }
    }
    console.log(sortedDeck);
    console.log(this.deckJson);
    this.deckJson.cards = sortedDeck;
    console.log(this.deckJson);
  }

  addCardToDecklist(event: any) {
    console.log("Try to add card");
    console.log(this.deckJson);
    let cardToAdd = this.getCardById(event.target.id);
    console.log(cardToAdd);
    if (cardToAdd) {
      this.deckJson.cards.push(cardToAdd);
      this.sortDeckById();
      console.log("Card Added")
    }
    else {
      console.error("NO CARD CORRESPOND TO THE GIVEN ID : " + event.target.id);
    }
  }
  

  removeCardFromDecklist(event) {
    let cardRemoved = false;
    for (let i = 0; i < this.deckJson.length; i++) {
      if (this.deckJson[i].id == event.target.id) {
        this.deckJson.splice(i, 1);
        cardRemoved = true;
        break;
      }
    }
  }

  debug() {
    console.log(this.deckJson);
    console.log(this.allDecks);
  }

}
