import { Component, OnInit } from '@angular/core';

import cardJson from '../../assets/cards.json'

@Component({
  selector: 'app-deckbuilder',
  templateUrl: './deckbuilder.component.html',
  styleUrls: ['./deckbuilder.component.scss']
})
export class DeckbuilderComponent implements OnInit {

  public cards = cardJson;

  constructor() { 
    console.log('Reading local json files');
    console.log(cardJson);
  }

  ngOnInit(): void {
  }

}
