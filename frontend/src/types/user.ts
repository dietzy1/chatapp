export interface User {
  userId: string;
  username: string;
  icon: Icon;
  joinDate: string;
  verified: boolean;
  chatServers: string[];
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
  userUuids: string[];
  channels: Channel[];
}

export interface Channel {
  channelId: string;
  name: string;
}
