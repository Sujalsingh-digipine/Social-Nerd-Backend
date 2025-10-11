import { MessageType } from "../enums/TextEnum";
import { ChatRoom } from "./ChatRoomType";

export interface Message {
  _id: string;
  ChatRoomId: ChatRoom;
  SenderId: string;
  content: string;
  type: MessageType;
  sentAt: Date;
}
