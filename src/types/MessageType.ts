import { MessageType } from "../enums/TextType";
import { ChatRoom } from "./ChatRoomType";

export interface Message {
  _id: string;
  ChatRoomId: ChatRoom;
  SenderId: string;
  content: string;
  type: MessageType;
  sentAt: Date;
}
