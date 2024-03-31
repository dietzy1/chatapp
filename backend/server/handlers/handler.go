package handlers

import (
	"context"
	"fmt"

	pb3 "github.com/dietzy1/chatapp/protos/auth/v1"
	pb2 "github.com/dietzy1/chatapp/protos/chatroom/v1"
	pb1 "github.com/dietzy1/chatapp/protos/user/v1"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"go.uber.org/zap"
	"google.golang.org/grpc"
)

type handlers struct {
	logger *zap.Logger
	pb1.UnimplementedUserServiceServer
	pb2.UnimplementedChatroomServiceServer
	pb3.UnimplementedAuthServiceServer

	userService     UserService
	authService     AuthService
	chatroomService ChatroomService
}

func NewHandlers(logger *zap.Logger, userService UserService, authService AuthService, chatroomService ChatroomService) *handlers {
	return &handlers{
		logger:          logger,
		userService:     userService,
		authService:     authService,
		chatroomService: chatroomService,
	}
}

func (h *handlers) RegisterServices(grpc *grpc.Server) {

	pb1.RegisterUserServiceServer(grpc, h)
	pb2.RegisterChatroomServiceServer(grpc, h)
	pb3.RegisterAuthServiceServer(grpc, h)
}

func RegisterGateway(ctx context.Context, gwmux *runtime.ServeMux, conn *grpc.ClientConn) error {
	if err := pb1.RegisterUserServiceHandler(ctx, gwmux, conn); err != nil {
		return fmt.Errorf("failed to register gateway: %v", err)
	}

	if err := pb2.RegisterChatroomServiceHandler(ctx, gwmux, conn); err != nil {
		return fmt.Errorf("failed to register gateway: %v", err)
	}

	if err := pb3.RegisterAuthServiceHandler(ctx, gwmux, conn); err != nil {
		return fmt.Errorf("failed to register gateway: %v", err)
	}

	return nil
}
