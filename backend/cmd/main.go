package main

import (
	"context"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/dietzy1/chatapp/broker"
	"github.com/dietzy1/chatapp/config"
	"github.com/dietzy1/chatapp/repository"
	"github.com/dietzy1/chatapp/server"
	"github.com/dietzy1/chatapp/service"
	"github.com/dietzy1/chatapp/websocket"

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

	broker, err := broker.New(&config.Broker)
	if err != nil {
		logger.Fatal("failed to initialize broker", zap.Error(err))
	}

	//Cache layer
	/* cache, err := cache.New(config.Cache)
	if err != nil {
		logger.Fatal("failed to initialize cache", zap.Error(err))
	} */

	//Broker layer

	//Services

	//iconService := service.NewIconService(logger, repository, cdn)

	authService := service.NewAuthService(logger, repository)
	chatroomService := service.NewChatroomService(logger, repository)
	messageService := service.NewMessageService(logger, repository)

	userService := service.NewUserService(logger, repository)

	s := server.New(&config.Server, userService, authService, chatroomService, messageService)

	websocketManager := websocket.NewManager(&config.Websocket, broker, messageService)

	// Start the gRPC server in a separate goroutine
	go func() {
		if err := s.ListenAndServe(); err != nil {
			// Handle gRPC server start error
			logger.Fatal("failed to start server", zap.Error(err))
		}
	}()

	go func() {
		//Here I want to call the gateway server
		if err := s.RunGateway(); err != nil {
			logger.Fatal("failed to start gateway", zap.Error(err))
		}
	}()

	go func() {
		if err := websocketManager.ListenAndServe(); err != nil {
			logger.Fatal("failed to start websocket server", zap.Error(err))
		}

	}()

	// Wait for the termination signal
	stopChan := make(chan os.Signal, 1)
	signal.Notify(stopChan, os.Interrupt, syscall.SIGTERM)
	<-stopChan

	//Create new context with timeout for graceful shutdown

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Start the graceful shutdown
	//s.Stop(ctx)
	_ = ctx

	logger.Info("Application gracefully stopped")
	os.Exit(0)

}
