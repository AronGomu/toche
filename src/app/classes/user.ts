export class User {
    public username: string;
    public socketId: number;
    public isNotMe: boolean;
    public isNotInGame: boolean;


    constructor(username: string, socketId?: number, isNotMe?: boolean, isNotInGame?: boolean) {
        this.username = username;
        this.socketId = socketId;
        this.isNotMe = isNotMe;
        if (isNotInGame) {
            this.isNotInGame = isNotInGame;
        } else {
            this.isNotInGame = true;
        }
    }
}