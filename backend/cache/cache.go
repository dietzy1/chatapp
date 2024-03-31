package cache

import (
	"context"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

type cache struct {
	client *redis.Client
}

type Config struct {
	RedisURL string
}

func New(c Config) (*cache, error) {
	otps, err := redis.ParseURL(c.RedisURL)
	if err != nil {
		return nil, fmt.Errorf("failed to parse redis url: %w", err)
	}

	redisClient := redis.NewClient(otps)

	if _, err := redisClient.Ping(context.Background()).Result(); err != nil {
		return nil, fmt.Errorf("failed to ping redis: %w", err)
	}

	return &cache{
		client: redisClient,
	}, nil
}

// Key is user_uuid and value is the token
func (c *cache) Get(key string) (string, error) {
	val, err := c.client.Get(context.Background(), key).Result()
	if err != nil {
		return "", fmt.Errorf("failed to get key %s: %w", key, err)
	}
	return val, nil
}

// Key is user_uuid and value is the token
func (c *cache) Set(key string, value string) error {
	return c.client.Set(context.Background(), key, value, 1*time.Hour).Err()
}
