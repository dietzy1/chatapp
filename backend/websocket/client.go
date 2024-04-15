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

//make run accept callbackActiveUsers(chatroomId string) []*client

func (c *client) run(callback activeUsersCallback) {
	//Start read and writer goroutines
	c.conn.run()
	callback.notifyChatroomClients(c.ids.chatroomId)

	//Open pubsub connection
	pubsub, err := c.broker.Subscribe(context.Background(), c.ids.channelId, c.ids.chatroomId)
	if err != nil {
		c.logger.Error("Failed to subscribe to pubsub", zap.Error(err))
		return
	}
	//Use the broker to send messages to the client

	//Send messages to

	//Retrieve last 25 messages from the message service

	//Send messages to the client
	//c.conn.sendChannel <- []byte("Hello")

	//handle events in blocking loop
	c.handleEvents(pubsub.Channel())

	//I dont think this is where the disconnect event should be handled
	callback.notifyChatroomClients(c.ids.chatroomId)

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

func (c *client) handleEvents(ch <-chan *redis.Message) {
	for {
		select {
		//Messages recieved from the recieve channel is from the user itself
		case msg, ok := <-c.conn.receiveChannel:
			if !ok {
				c.logger.Info("receive channel closed")
				return
			}

			//Unmarshal into packet

			packet, err := UnmarshalPacket[CreateMessageEvent](msg)
			if err != nil {
				c.logger.Error("Failed to unmarshal packet", zap.Error(err))
				return
			}

			//Call the message service to create a message
			response, err := c.messageService.CreateMessage(context.TODO(), service.CreateMessage{
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

			//Marshal message into packet
			responsePacket, err := MarshalPacket(Packet[RecieveMessageEvent]{
				Kind: "2",
				Payload: RecieveMessageEvent{
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

			//check if userID is same as Author ID -- to avoid duplicate messages
			//TODO: why the fuck does this code exist?
			/* if c.ids.user != message.AuthorUuid {
				c.conn.sendChannel <- message1
			} */

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
