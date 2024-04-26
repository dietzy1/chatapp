package websocket

import (
	"encoding/json"

	"github.com/dietzy1/chatapp/service"
)

type Constraint interface {
	service.CreateMessage | service.Message | ActivityEvent | InitialMessages
}

type MessageKind string

const (
	CreateMessageKind  MessageKind = "CREATE"
	RecieveMessageKind MessageKind = "RECIEVE"
	InitialKind        MessageKind = "INITIAL"
	ActivityKind       MessageKind = "ACTIVITY"
)

type Packet[T Constraint] struct {
	Kind    MessageKind `json:"kind"`
	Payload T           `json:"payload"`
}

type InitialMessages struct {
	Messages []service.Message `json:"messages"`
}

// Kind = "3"
type ActivityEvent struct {
	ActiveUsers []string `json:"activeUsers"`
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
