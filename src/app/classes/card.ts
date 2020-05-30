export class Card {
    idInt: number;
    colorString: string;
    factionString: string;
    nameString: string;
    levelInt: number;
    manacostString: string;
    typeStringArray: string[];
    archetypeStringArray: string[];
    subtypeStringArray: string[];
    attackInt: number;
    powerInt: number;
    instantSpeedplayableBoolBool: boolean;
    imgUrlString: string;

    inGameIdInt: number;
    ownerPlayer: object;
    revealedBool: boolean;
    playableBool: boolean; 
    selectableBool: boolean;
    selectedBool: boolean;

    constructor(idInt:number, colorString:string, factionString:string, nameString:string, levelInt: number, manacostString:string, typeStringArray:string[], archetypeStringArray:string[], subtypeStringArray:string[], attackInt:number, powerInt:number, instantSpeedplayableBoolBool: boolean, imgUrlString:string) {
        this.idInt = idInt;
        this.colorString = colorString;
        this.factionString = factionString;
        this.nameString = nameString;
        this.levelInt = levelInt;
        this.manacostString = manacostString;
        this.typeStringArray = typeStringArray;
        this.archetypeStringArray = archetypeStringArray;
        this.subtypeStringArray = subtypeStringArray;
        this.attackInt = attackInt;
        this.powerInt = powerInt;
        this.instantSpeedplayableBoolBool = instantSpeedplayableBoolBool;
        this.imgUrlString = imgUrlString;

        this.inGameIdInt = null;
        this.ownerPlayer = null;
        this.revealedBool = false;
        this.playableBool = false;
        this.selectableBool = false;
        this.selectedBool = false;
    }
}