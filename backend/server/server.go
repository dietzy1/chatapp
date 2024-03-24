package server

import (
	"context"
	"net"
	"net/http"

	"go.uber.org/zap"
	"go.uber.org/zap/zapgrpc"
	"google.golang.org/grpc"
	"google.golang.org/grpc/grpclog"

	"github.com/dietzy1/chatapp/server/handlers"
)

type server struct {
	grpc     *grpc.Server
	gwServer *http.Server

	logger *zap.Logger
	config *Config
}

type Config struct {
	Addr        string
	GatewayAddr string
	Logger      *zap.Logger
}

func New(c *Config, userService handlers.UserService) *server {

	logger := zapgrpc.NewLogger(c.Logger)
	//Unsure if this is even supposed to be here honestly
	//log := grpclog.NewLoggerV2(os.Stdout, io.Discard, io.Discard)
	grpclog.SetLoggerV2(logger)

	//Create new GRPC server object
	grpc := grpc.NewServer(
		grpc.UnaryInterceptor(loggingMiddleware(c.Logger)),
	)

	s := &server{
		grpc:   grpc,
		logger: c.Logger,
		config: c,
	}
	handlers.NewHandlers(c.Logger, userService).RegisterServices(s.grpc)

	return s
}

func (s *server) ListenAndServe() error {

	lis, err := net.Listen("tcp", s.config.Addr)
	if err != nil {
		s.logger.Error("Failed to listen:", zap.Error(err))
		return err
	}

	s.logger.Info("Serving gRPC on http://", zap.String("addr", s.config.Addr))

	if err := s.grpc.Serve(lis); err != nil {
		s.logger.Error("Failed to serve:", zap.Error(err))
		return err
	}

	return nil
}

func (s *server) Stop(ctx context.Context) {
	s.grpc.GracefulStop()
	s.gwServer.Shutdown(ctx)
	s.logger.Info("gRPC server stopped gracefully")
}
