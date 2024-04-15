export interface CreateMessageEvent {
  channelId: string;
  chatroomId: string;
  userId: string;
  content: string;
}

//Kind = "2"
export interface RecieveMessageEvent {
  messageId: string;
  channelId: string;
  chatroomId: string;
  userId: string;
  content: string;
  createdAt: string;
}

//Kind = "3"
export interface ActivityEvent {
  activeUsers: string[];
}

export interface Message {
  message: RecieveMessageEvent[];
  dayDifference: boolean;
}
