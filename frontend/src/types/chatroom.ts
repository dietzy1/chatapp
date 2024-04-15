import { Icon } from "./icon";

export interface Chatroom {
  chatroomId: string;
  name: string;
  description: string;
  icon: Icon;
  admin: string;
  channels: Channel[];
}

export interface Channel {
  channelId: string;
  name: string;
}
