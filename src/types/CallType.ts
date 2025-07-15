import { ChatRoom } from "./ChatRoomType";
import { User } from "./UserType";

export interface Call {
    _id:string,
    ChatRoomId:ChatRoom,
    callerId:User,
    

}