export class User {
    public username: string;
    public socketId: number;

    constructor(username: string, socketId: number) {
        this.username = username;
        this.socketId = socketId;
    }
}