export interface User {
  userId: string;
  username: string;
  icon: Icon;
  description: string;
  joinDate: string;
  verified: boolean;
}

export interface Icon {
  iconId: string;
  link: string;
  kind: string;
}

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

export interface Message {
  messageId: string;
  channelId: string;
  senderId: string;
  content: string;
  timestamp: string;
}
