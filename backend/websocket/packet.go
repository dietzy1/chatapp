package websocket

import "github.com/dietzy1/chatapp/service"

type Constraint interface {
	service.CreateMessage | service.Message | ActivityEvent
}

type ActivityEvent struct {
	ActiveUsers []string `json:"activeUsers"`
}

// Kind can be of type "1", "2", "3"
type Packet[T Constraint] struct {
	Kind string `json:"kind"`
	Data T      `json:"data"`
}

func NewPacket[T Constraint](kind string, data T) Packet[T] {

	return Packet[T]{
		Kind: kind,
		Data: data,
	}
}
