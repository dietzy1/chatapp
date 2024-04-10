package websocket

type Constraint interface {
	UserMessage | ActivityMessage
}

type Msg[T Constraint] struct {
	Kind string `json:"kind"`
	Data T      `json:"data"`
}

type ActivityMessage struct {
}

type UserMessage struct {
}

/* type Message interface{}

type Msg struct {
    Kind string  `json:"kind"`
    Data Message `json:"data"`
}

type ActivityMessage struct {
}

type UserMessage struct {
} */
