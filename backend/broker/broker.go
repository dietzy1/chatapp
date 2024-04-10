package broker

import (
	"context"
	"fmt"

	"github.com/go-redis/redis/v8"
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

	otps, err := redis.ParseURL(c.Url)
	if err != nil {

		c.Logger.Error("Failed to parse redis url", zap.Error(err))
		return nil, fmt.Errorf("failed to parse redis url: %w", err)
	}
	client := redis.NewClient(otps)
	if _, err := client.Ping(context.Background()).Result(); err != nil {

		c.Logger.Error("Failed to ping redis", zap.Error(err))
		return nil, fmt.Errorf("failed to ping redis: %w", err)
	}

	return &broker{
		client: client,
		logger: c.Logger,
	}, nil
}

// Subscribe subscribes to a channel and returns a PubSub instance for receiving messages.
func (b *broker) Subscribe(ctx context.Context, channel string) (*redis.PubSub, error) {
	pubsub := b.client.Subscribe(ctx, channel)
	_, err := pubsub.Receive(ctx)
	if err != nil {
		b.logger.Error("Failed to subscribe to channel", zap.String("channel", channel))
		return nil, err
	}

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
func (b *broker) Publish(ctx context.Context, channel string, message []byte) error {
	err := b.client.Publish(ctx, channel, message).Err()
	if err != nil {
		b.logger.Error("Failed to publish message to channel", zap.String("channel", channel))
		return err
	}
	return nil
}
