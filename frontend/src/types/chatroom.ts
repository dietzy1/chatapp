export interface Chatroom {
  chatroomId: string;
  name: string;
  description: string;
  iconSrc: string;
  admin: string;
  channels: Channel[];
}

export interface Channel {
  channelId: string;
  name: string;
}
