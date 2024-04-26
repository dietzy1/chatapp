export interface CreateMessage {
  channelId: string;
  chatroomId: string;
  userId: string;
  content: string;
}

export interface Message {
  messageId: string;
  channelId: string;
  chatroomId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface ActivityEvent {
  activeUsers: string[];
}

export interface InitialMessages {
  messages: Message[];
}

export interface CompressedMessages {
  message: Message[];
  dayDifference: boolean;
}
