package config

import (
	"log"
	"os"

	"github.com/dietzy1/chatapp/broker"
	"github.com/dietzy1/chatapp/cache"
	"github.com/dietzy1/chatapp/clients"
	"github.com/dietzy1/chatapp/repository"
	"github.com/dietzy1/chatapp/server"
	"github.com/dietzy1/chatapp/websocket"
	"github.com/joho/godotenv"
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

	//Read in .env file

	readEnvfile()

	return &Config{
		Server: server.Config{
			Addr:        ":8000",
			GatewayAddr: ":9000",
			Logger:      logger,
		},
		Repository: repository.Config{
			PostgressURL: "postgres://root:root@localhost:5432/postgres",
			MongoURL:     os.Getenv("MONGO_URL"),
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

// reads the .env file and sets the environment variables, if the file is not found, it will log an error and the program will default to injected production variables.
func readEnvfile() {

	//print current path
	dir, _ := os.Getwd()
	log.Println(dir)

	//Read the .env file
	err := godotenv.Load("./.env")
	if err != nil {
		log.Println("Loading .env file failed, using production environment")
	}
	if err == nil {
		log.Println("Loaded .env file")
	}
}
