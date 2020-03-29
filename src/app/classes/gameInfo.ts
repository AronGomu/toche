import { User } from './user';

export class GameInfo {


    public roomCreator: User;
    public roomJoiner: User;
    public isCreator: boolean;
    public isPrivate: boolean;
    public socketRoomName: string;
    public isStarted: boolean;

    constructor(roomCreator?: User, roomJoiner?: User, isCreator?: boolean, isPrivate?: boolean, socketRoomName?: string, isStarted?: boolean) {
        this.roomCreator = roomCreator;
        this.roomJoiner = roomJoiner;
        this.isCreator = isCreator;
        this.isPrivate = isPrivate;
        this.socketRoomName = socketRoomName;
        this.isStarted = isStarted;
    }
}