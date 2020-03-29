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
    img_url: string;

    constructor(id:string, color:string, faction:string, name:string, manacost:string, type:string[], archetype:string[], subtype:string[], attack:number, power:number, img_url:string) {
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
        this.img_url = img_url;
    }
}