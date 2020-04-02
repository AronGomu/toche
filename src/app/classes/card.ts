export class Card {
    id: string;
    color: string;
    faction: string;
    name: string;
    manacost: string;
    type: string[];
    archetype: string[];
    subtype: string[];
    attack: number;
    power: number;
    imgUrl: string;

    constructor(id:string, color:string, faction:string, name:string, manacost:string, type:string[], archetype:string[], subtype:string[], attack:number, power:number, imgUrl:string) {
        this.id = id;
        this.color = color;
        this.faction = faction;
        this.name = name;
        this.manacost = manacost;
        this.type = type;
        this.archetype = archetype;
        this.subtype = subtype;
        this.attack = attack;
        this.power = power;
        this.imgUrl = imgUrl;
    }
}