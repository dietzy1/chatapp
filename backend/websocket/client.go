package websocket

import (
	"context"

	"github.com/dietzy1/chatapp/service"
	"github.com/redis/go-redis/v9"
	"go.uber.org/zap"
)

type MessageBroker interface {
	Subscribe(ctx context.Context, channel, chatroom string) (*redis.PubSub, error)
	Unsubscribe(ctx context.Context, pubsub *redis.PubSub) error
	Publish(ctx context.Context, reciever string, message []byte) error
}

type MessageService interface {
	GetMessages(ctx context.Context, chatroomId, channelId string) ([]service.Message, error)
	CreateMessage(ctx context.Context, createMsg service.CreateMessage) (service.Message, error)
}

type client struct {
	ids ids

	conn *connection

	logger *zap.Logger

	broker MessageBroker

	messageService MessageService
}

func newClient(ids ids, conn *connection, logger *zap.Logger, broker MessageBroker, messageService MessageService) *client {

	return &client{
		ids:            ids,
		conn:           conn,
		logger:         logger,
		broker:         broker,
		messageService: messageService,
	}

}

func (c *client) run(callback activeUsersCallback) {
	//Start read and writer goroutines
	c.conn.run()

	//Open pubsub connection for the chatroom and channel
	pubsub, err := c.broker.Subscribe(context.Background(), c.ids.channelId, c.ids.chatroomId)
	if err != nil {
		c.logger.Error("Failed to subscribe to pubsub", zap.Error(err))
		return
	}

	c.emitActivityEvent(callback, false)
	c.SendInitialMessages()
	//handle events in blocking loop
	c.handleEvents(pubsub.Channel())

	//Now the issue is that the client is not removed from the manager when the connection is closed
	c.emitActivityEvent(callback, true)

	//Close pubsub connection
	if err := c.broker.Unsubscribe(context.Background(), pubsub); err != nil {
		c.logger.Error("Failed to unsubscribe from pubsub", zap.Error(err))
	}
	if err := pubsub.Close(); err != nil {
		c.logger.Error("Failed to close pubsub", zap.Error(err))
	}

	//Cleanup connection
	c.conn.cleanup()
}

func (c *client) emitActivityEvent(callback activeUsersCallback, disconnecting bool) {
	chatroomClients := callback.getChatroomClients(c.ids.chatroomId)

	//If the client is disconnecting, remove the client from the list of active users
	if disconnecting {
		for i, id := range chatroomClients {
			if id == c.ids.userId {
				chatroomClients = append(chatroomClients[:i], chatroomClients[i+1:]...)
				break
			}
		}
	}

	//Log the number of active users
	c.logger.Info("Number of active users", zap.Int("active_users", len(chatroomClients)))
	//Marshal message into packet
	responsePacket, err := MarshalPacket(Packet[ActivityEvent]{
		Kind: ActivityKind,
		Payload: ActivityEvent{
			ActiveUsers: chatroomClients,
		},
	})
	if err != nil {
		c.logger.Error("Failed to marshal packet", zap.Error(err))
		return
	}

	c.broker.Publish(context.Background(), c.ids.chatroomId, responsePacket)
}

// Handle the initial connection by retrieving the last 25 messages
func (c *client) SendInitialMessages() {
	//Retrieve last 25 messages from the message service
	messages, err := c.messageService.GetMessages(context.TODO(), c.ids.chatroomId, c.ids.channelId)
	if err != nil {
		c.logger.Error("Failed to get messages", zap.Error(err))
		return
	}

	responsePacket, err := MarshalPacket(Packet[InitialMessages]{
		Kind: InitialKind,
		Payload: InitialMessages{
			Messages: messages,
		},
	})
	if err != nil {
		c.logger.Error("Failed to marshal packet", zap.Error(err))
		return
	}

	if err := c.broker.Publish(context.TODO(), c.ids.channelId, responsePacket); err != nil {
		c.logger.Error("Failed to publish initial messages", zap.Error(err))
	}
}

func (c *client) handleEvents(ch <-chan *redis.Message) {
	for {
		select {
		//Messages recieved from the recieve channel is from the user itself
		case msg, ok := <-c.conn.receiveChannel:
			if !ok {
				c.logger.Info("receive channel closed")
				return
			}

			packet, err := UnmarshalPacket[service.CreateMessage](msg)
			if err != nil {
				c.logger.Error("Failed to unmarshal packet", zap.Error(err))
				return
			}

			response, err := c.messageService.CreateMessage(context.TODO(), service.CreateMessage{
				Kind:       packet.Payload.Kind,
				ChannelId:  packet.Payload.ChannelId,
				ChatroomId: packet.Payload.ChatroomId,
				UserId:     packet.Payload.UserId,
				Content:    packet.Payload.Content,
			},
			)
			if err != nil {
				c.logger.Error("Failed to create message", zap.Error(err))
				return
			}

			responsePacket, err := MarshalPacket(Packet[service.Message]{
				Kind: RecieveMessageKind,
				Payload: service.Message{
					Kind:       response.Kind,
					MessageId:  response.MessageId,
					ChannelId:  response.ChannelId,
					ChatroomId: response.ChatroomId,
					UserId:     response.UserId,
					Content:    response.Content,
					CreatedAt:  response.CreatedAt,
				},
			})
			if err != nil {
				c.logger.Error("Failed to marshal packet", zap.Error(err))
				return
			}

			if err := c.broker.Publish(context.TODO(), c.ids.channelId, responsePacket); err != nil {
				c.logger.Error("Failed to publish message", zap.Error(err))
				return
			}

		//Handle messages recieved from the redis broker
		case msg, ok := <-ch:
			if !ok {
				c.logger.Info("Redis broker channel closed")
				return
			}
			c.logger.Info("Recieved shit from redis broker", zap.Any("", msg.Payload))

			//convert msg.Payload to slice of bytes
			c.conn.sendChannel <- []byte(msg.Payload)
		}
	}
}

//TODO: Initial connection:
//Use the broker to send messages to the client

//Send messages to

//Retrieve last 25 messages from the message service

/* 	messages, err := c.messageService.GetMessages(context.TODO(), c.ids.chatroomId, c.ids.channelId)
if err != nil {
	c.logger.Error("Failed to get messages", zap.Error(err))
	return
}

//Marshal messages into packets
for _, message := range messages {
	packet, err := MarshalPacket(Packet[RecieveMessageEvent]{
		Kind: "2",
		Payload: RecieveMessageEvent{
			MessageId:  message.MessageId,
			ChannelId:  message.ChannelId,
			ChatroomId: message.ChatroomId,
			UserId:     message.UserId,
			Content:    message.Content,
			CreatedAt:  message.CreatedAt,
		},
	})
	if err != nil {
		c.logger.Error("Failed to marshal packet", zap.Error(err))
		return
	}
	_ = packet
} */

//Send messages to the client
//c.conn.sendChannel <- []byte("Hello")
