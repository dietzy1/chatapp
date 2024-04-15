package broker

import (
	"context"
	"fmt"

	"github.com/redis/go-redis/v9"
	"go.uber.org/zap"
)

// PubSub is an interface for a Redis Pub/Sub client.
/* type Broker interface {
	Subscribe(ctx context.Context, channel string) (*redis.PubSub, error)
	unsubscribe(ctx context.Context, pubsub *redis.PubSub) error
	Publish(ctx context.Context, channel string, message []byte) error
} */

// RedisPubSub is an implementation of the PubSub interface using the go-redis library.
type broker struct {
	client *redis.Client
	logger *zap.Logger
}

type Config struct {
	Url    string
	Logger *zap.Logger
}

// NewRedisPubSub creates a new RedisPubSub instance.
func New(c *Config) (*broker, error) {

	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "root",
		DB:       0, // use default DB
	})
	cmd := client.Ping(context.Background())
	//Check if the connection is successful
	if cmd.Err() != nil {
		return nil, fmt.Errorf("failed to ping redis: %w", cmd.Err())
	}

	//Set some value and retrieve it
	err := client.Set(context.Background(), "key", "value", 0).Err()
	if err != nil {
		return nil, fmt.Errorf("failed to set key: %w", err)
	}

	val, err := client.Get(context.Background(), "key").Result()
	if err != nil {
		return nil, fmt.Errorf("failed to get key: %w", err)
	}

	c.Logger.Info("Successfully connected to redis", zap.String("key", val))

	return &broker{
		client: client,
		logger: c.Logger,
	}, nil
}

// Subscribe subscribes to a channel and returns a PubSub instance for receiving messages.
func (b *broker) Subscribe(ctx context.Context, channel, chatroom string) (*redis.PubSub, error) {
	pubsub := b.client.Subscribe(ctx, channel)
	_, err := pubsub.Receive(ctx)
	if err != nil {
		b.logger.Error("Failed to subscribe to channel", zap.String("channel", channel))
		return nil, err
	}
	b.logger.Info("Subscribed to channel", zap.String("channel", channel))

	return pubsub, nil
}

func (b *broker) Unsubscribe(ctx context.Context, pubsub *redis.PubSub) error {
	err := pubsub.Unsubscribe(ctx)
	if err != nil {
		b.logger.Error("Failed to unsubscribe from channel")
		return err
	}

	b.logger.Info("Unsubscribed from channel", zap.String("channel", pubsub.String()))
	return nil
}

// Send message to channel
func (b *broker) Publish(ctx context.Context, reciever string, message []byte) error {
	err := b.client.Publish(ctx, reciever, message).Err()
	if err != nil {
		b.logger.Error("Failed to publish message to channel", zap.String("reciever", reciever))
		return err
	}
	return nil
}
