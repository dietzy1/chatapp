package websocket

import "encoding/json"

type Constraint interface {
	CreateMessageEvent | RecieveMessageEvent | ActivityEvent
}

// Kind = "1"
type CreateMessageEvent struct {
	ChannelId  string `json:"channelId"`
	ChatroomId string `json:"chatroomId"`
	UserId     string `json:"userId"`
	Content    string `json:"content"`
}

// Kind = "2"
type RecieveMessageEvent struct {
	MessageId  string `json:"messageId"`
	ChannelId  string `json:"channelId"`
	ChatroomId string `json:"chatroomId"`
	UserId     string `json:"userId"`
	Content    string `json:"content"`
	CreatedAt  string `json:"createdAt"`
}

// Kind = "3"
type ActivityEvent struct {
	ActiveUsers []string `json:"activeUsers"`
}

// Kind can be of type "1", "2", "3"
type Packet[T Constraint] struct {
	Kind    string `json:"kind"`
	Payload T      `json:"payload"`
}

// MarshalPacket marshals a Packet to JSON
func MarshalPacket[T Constraint](packet Packet[T]) ([]byte, error) {
	return json.Marshal(packet)
}

// UnmarshalPacket unmarshals JSON into a Packet
func UnmarshalPacket[T Constraint](data []byte) (Packet[T], error) {
	var packet Packet[T]
	err := json.Unmarshal(data, &packet)
	return packet, err
}

/* interface Packet {
	kind: string;
	payload: CreateMessageEvent | RecieveMessageEvent | ActivityEvent;
  }

  //Kind = "1"
  interface CreateMessageEvent {
	channelId: string;
	chatroomId: string;
	userId: string;
	content: string;
  }

  //Kind = "2"
  interface RecieveMessageEvent {
	messageId: string;
	channelId: string;
	chatroomId: string;
	userId: string;
	content: string;
	createdAt: string;
  }

  //Kind = "3"
  interface ActivityEvent {
	activeUsers: string[];
  } */
