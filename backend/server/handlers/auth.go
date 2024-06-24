package handlers

import (
	"context"

	pb "github.com/dietzy1/chatapp/protos/auth/v1"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

const sessionTokenName = "session_token"

type AuthService interface {
	VerifySessionToken(ctx context.Context, sessionToken string) (string, error)
	DeleteSessionToken(ctx context.Context, sessionToken, userId string) error
	Login(ctx context.Context, username, password string) (string, error)
}

func (h *handlers) GetAuth(ctx context.Context, req *pb.GetAuthRequest) (*pb.GetAuthResponse, error) {
	//Delay the response with 60 seconds
	//time.Sleep(120 * time.Second)

	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		h.logger.Info("no metadata")
		return &pb.GetAuthResponse{}, status.Errorf(codes.Unauthenticated, "no metadata")
	}

	sessionToken := md.Get(sessionTokenName)
	if len(sessionToken) == 0 {
		h.logger.Info("no session token")
		return &pb.GetAuthResponse{}, status.Errorf(codes.Unauthenticated, "no session token")
	}

	//Check if the session token is valid by calling into the auth service
	userId, err := h.authService.VerifySessionToken(ctx, sessionToken[0])
	if err != nil {
		h.logger.Info("failed to verify session token", zap.Error(err))
		return &pb.GetAuthResponse{}, status.Errorf(codes.Unauthenticated, "invalid session token")
	}

	return &pb.GetAuthResponse{
		UserId: userId,
	}, nil
}

func (h *handlers) Logout(ctx context.Context, req *pb.LogoutRequest) (*pb.LogoutResponse, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		h.logger.Info("no metadata")
		return &pb.LogoutResponse{}, status.Errorf(codes.Unauthenticated, "no metadata")
	}

	sessionToken := md.Get(sessionTokenName)
	if len(sessionToken) == 0 {
		h.logger.Info("no session token")
		return &pb.LogoutResponse{}, status.Errorf(codes.Unauthenticated, "no session token")
	}

	//Delete the session token from the cache
	err := h.authService.DeleteSessionToken(ctx, sessionToken[0], req.UserId)
	if err != nil {
		h.logger.Info("failed to delete session token", zap.Error(err))
		return &pb.LogoutResponse{}, status.Errorf(codes.Internal, "failed to delete session token")
	}

	return &pb.LogoutResponse{}, nil
}

func (h *handlers) Login(ctx context.Context, req *pb.LoginRequest) (*pb.LoginResponse, error) {

	sessionToken, err := h.authService.Login(ctx, req.Username, req.Password)
	if err != nil {
		h.logger.Info("failed to login", zap.Error(err))
		return &pb.LoginResponse{}, status.Errorf(codes.Unauthenticated, "failed to login")
	}

	//Add the session token to the metadata
	md := metadata.Pairs(sessionTokenName, sessionToken)
	grpc.SendHeader(ctx, md)

	return &pb.LoginResponse{}, nil

}
