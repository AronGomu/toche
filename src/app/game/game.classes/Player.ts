import { Deck } from 'src/app/classes/Deck';
import { Manapool } from './Mana';
import { Card } from 'src/app/classes/card';
import { Field } from './Field';

export class Player {

	public name;

	public life: number;
	public manapool: Manapool[];
	public levelPointPool: number;

	public deck: Card[];
	public hand: Card[];
	public field: Field;

	constructor(name: string) {
		this.name = name;
	}


}