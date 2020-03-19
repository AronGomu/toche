export class User {
    public username: string;
    public socketId: number;
    public isNotMe: boolean; 

    constructor(username: string, socketId: number, isNotMe: boolean) {
        this.username = username;
        this.socketId = socketId;
        this.isNotMe = isNotMe;
    }
}