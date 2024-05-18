package handlers

import (
	"context"

	pb "github.com/dietzy1/chatapp/protos/user/v1"
	"github.com/dietzy1/chatapp/service"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

type UserService interface {
	CreateUser(ctx context.Context, username, description, iconId string) (string, string, error)
	GetUser(ctx context.Context, userID string) (service.User, error)
	GetUsers(ctx context.Context, chatroomID string) ([]service.User, error)
}

func (h *handlers) CreateUser(ctx context.Context, req *pb.CreateUserRequest) (*pb.CreateUserResponse, error) {

	userId, sessionToken, err := h.userService.CreateUser(ctx, req.Username, req.Description, req.IconSrc)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to create user: %v", err)
	}

	//Add sessionToken to the response metadata

	md := metadata.Pairs(sessionTokenName, sessionToken)
	if err := grpc.SendHeader(ctx, md); err != nil {
		return nil, status.Errorf(codes.Internal, "failed to send metadata: %v", err)
	}

	h.logger.Info("User created", zap.Any("user", userId))

	return &pb.CreateUserResponse{
		UserId: userId,
	}, nil
}

func (h *handlers) GetUser(ctx context.Context, req *pb.GetUserRequest) (*pb.GetUserResponse, error) {

	user, err := h.userService.GetUser(ctx, req.UserId)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to get user: %v", err)
	}

	h.logger.Info("User retrieved", zap.Any("user", user))

	return &pb.GetUserResponse{
		User: &pb.User{
			UserId:      user.UserID.String(),
			Username:    user.Username,
			IconSrc:     user.IconSrc,
			JoinDate:    user.JoinDate,
			Description: user.Description,
			Verified:    user.Verified,
		},
	}, nil
}

func (h *handlers) GetUsers(ctx context.Context, req *pb.GetUsersRequest) (*pb.GetUsersResponse, error) {

	users, err := h.userService.GetUsers(ctx, req.ChatroomId)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to get users: %v", err)
	}

	pbusers := make([]*pb.User, len(users))
	for i, user := range users {
		pbusers[i] = &pb.User{
			UserId:      user.UserID.String(),
			Username:    user.Username,
			IconSrc:     user.IconSrc,
			JoinDate:    user.JoinDate,
			Description: user.Description,
			Verified:    user.Verified,
		}
	}

	return &pb.GetUsersResponse{
		Users: pbusers,
	}, nil
}
