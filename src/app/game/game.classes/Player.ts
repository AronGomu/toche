import { Deck } from 'src/app/classes/Deck';
import { Manapool } from './Mana';
import { Card } from 'src/app/classes/card';
import { Field } from './Field';

export class Player {

	public username: string;

	public life: number;
	public manapool: Manapool[];
	public levelPointPool: number;

	public deck: Card[];
	public hand: Card[];
	public field: Field;

	public haveTurn: boolean;
	public havePriority: boolean;

	public opponent: Player;

	constructor(username: string) {
		this.username = username;
	}


}