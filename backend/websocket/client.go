package websocket

import (
	"context"
	"encoding/json"

	"github.com/dietzy1/chatapp/service"
	"github.com/go-redis/redis/v8"
	"go.uber.org/zap"
)

type MessageBroker interface {
	Subscribe(ctx context.Context, channel string) (*redis.PubSub, error)
	Unsubscribe(ctx context.Context, pubsub *redis.PubSub) error
	Publish(ctx context.Context, channel string, message []byte) error
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

func (c *client) run() {
	//Start read and writer goroutines
	c.conn.run()

	//Open pubsub connection
	pubsub, err := c.broker.Subscribe(context.Background(), c.ids.userId)
	if err != nil {
		c.logger.Error("Failed to subscribe to pubsub", zap.Error(err))
		return
	}

	//handle events in blocking loop
	c.handleEvents(pubsub.Channel())

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

			//Unmarshal message
			unmarshaledMsg := service.CreateMessage{}
			if err := json.Unmarshal(msg, &unmarshaledMsg); err != nil {
				c.logger.Error("Failed to unmarshal message", zap.Error(err))
				return
			}

			//Call the message service to create a message
			response, err := c.messageService.CreateMessage(context.TODO(), unmarshaledMsg)
			if err != nil {
				c.logger.Error("Failed to create message", zap.Error(err))
				return
			}

			//Marshal message
			marshaledMsg, err := json.Marshal(response)
			if err != nil {
				c.logger.Error("Failed to marshal message", zap.Error(err))
				return
			}

			if err := c.broker.Publish(context.TODO(), c.ids.channelId, marshaledMsg); err != nil {
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

			//convert msg.Payload to slice of bytes
			c.conn.sendChannel <- []byte(msg.Payload)
		}
	}

}
