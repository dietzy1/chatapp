package config

import (
	/* "github.com/dietzy1/chatapp/repository" */
	"github.com/dietzy1/chatapp/server"
	"go.uber.org/zap"
)

type Config struct {
	//Log lvl?

	Server server.Config
	/* Repository repository.Config */
}

func New(logger *zap.Logger) (*Config, error) {
	return &Config{
		Server: server.Config{
			Addr:        ":8000",
			GatewayAddr: ":9000",
			Logger:      logger,
		},
		/* Repository: repository.Config{}, */
	}, nil
}
