package main

import (
	"context"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/dietzy1/chatapp/config"
	"github.com/dietzy1/chatapp/server"
	"github.com/dietzy1/chatapp/service"
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
	_ = config

	//Database

	//Broker

	//Services
	userService := service.NewUserService(logger)

	s := server.New(&config.Server, userService)

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
