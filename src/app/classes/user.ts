export class User {
    public username: string;
    public socketId: number;
    public isMe: boolean;
    public isInGame: boolean;


    constructor(username: string, socketId?: number, isMe?: boolean, isInGame?: boolean) {
        this.username = username;
        this.socketId = socketId;
        this.isMe = isMe;
        if (isInGame) {
            this.isInGame = isInGame;
        } else {
            this.isInGame = true;
        }
    }
}