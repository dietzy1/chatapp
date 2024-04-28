export type Kind = "MESSAGE" | "GIF";
export interface CreateMessage {
  kind: Kind;
  channelId: string;
  chatroomId: string;
  userId: string;
  content: string;
}

export interface Message {
  kind: Kind;
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
