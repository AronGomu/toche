import { Deck } from 'src/app/classes/Deck';
import { Manapool } from './Manapool';
import { Card } from 'src/app/classes/card';
import { Field } from './Field';

export class Player {

	public username: string;

	public life: number;
	public manapool: Manapool;
	public levelPointPool: number;

	public deck: Card[];
	public extraDeck: Card[];
	public sideDeck: Card[];

	public hand: Card[];
	public field: Card[];
	public graveyard: Card[];
	public exile: Card[];

	public haveTurn: boolean;
	public havePriority: boolean;
	public yieldThroughTurn: boolean;

	public isGraveyardEmpty: boolean = true;
	public lastCardFromGraveyard: Card = null;

	public isTopCardFromDeckRevealed: boolean = false;
	public topCardFromDeck: Card = null;

	public opponent: Player;

	constructor(username: string) {
		this.username = username;
		this.manapool = new Manapool();
	}


}