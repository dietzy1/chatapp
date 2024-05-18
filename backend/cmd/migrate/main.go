package main

import (
	"github.com/dietzy1/chatapp/config"
	"github.com/dietzy1/chatapp/repository"
	"go.uber.org/zap"
)

func main() {

	logger, err := zap.NewDevelopment()
	if err != nil {
		logger.Fatal("failed to initialize logger", zap.Error(err))
	}

	config, err := config.New(logger)
	if err != nil {
		logger.Warn("failed to load config", zap.Error(err))
		logger.Warn("Application will start with default configuration")
	}

	repository, err := repository.New(&config.Repository)
	if err != nil {
		logger.Fatal("failed to initialize repository", zap.Error(err))
	}

	//Migrate database
	if err := repository.Migrate(); err != nil {
		logger.Fatal("failed to migrate database", zap.Error(err))
	}

}
