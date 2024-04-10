package config

import (
	"github.com/dietzy1/chatapp/broker"
	"github.com/dietzy1/chatapp/cache"
	"github.com/dietzy1/chatapp/clients"
	"github.com/dietzy1/chatapp/repository"
	"github.com/dietzy1/chatapp/server"
	"github.com/dietzy1/chatapp/websocket"
	"go.uber.org/zap"
)

type Config struct {
	//Log lvl?
	Server     server.Config
	Repository repository.Config
	Broker     broker.Config
	Websocket  websocket.Config

	//Not done yet
	Cache cache.Config
	Cdn   clients.Config
}

func New(logger *zap.Logger) (*Config, error) {
	return &Config{
		Server: server.Config{
			Addr:        ":8000",
			GatewayAddr: ":9000",
			Logger:      logger,
		},
		Repository: repository.Config{
			DatabaseURL: "postgres://root:root@localhost:5432/postgres",
		},
		Broker: broker.Config{
			Url:    "redis://localhost:6379", //FIXME: Verify this
			Logger: logger,
		},
		Websocket: websocket.Config{
			Addr:   ":9080",
			Logger: logger,
		},

		Cache: cache.Config{},
		Cdn: clients.Config{
			PublicKey:   "public_123",
			PrivateKey:  "private_123",
			UrlEndpoint: "https://cdn.example.com",
		},
	}, nil

}
