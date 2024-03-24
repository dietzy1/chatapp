package handlers

import (
	"context"

	pb "github.com/dietzy1/chatapp/protos/user/v1"
	"github.com/dietzy1/chatapp/service"
	"go.uber.org/zap"
)

type UserService interface {
	CreateUser(ctx context.Context) (service.User, error)
}

func (h *handlers) CreateUser(ctx context.Context, req *pb.CreateUserRequest) (*pb.CreateUserResponse, error) {
	/* user := &pb.User{
		UserId:   "123",
		Username: "Snartin",
		Icon: &pb.Icon{
			IconId: "123",
			Link:   "https://emojiisland.com/cdn/shop/products/Very_Angry_Emoji_7f7bb8df-d9dc-4cda-b79f-5453e764d4ea_large.png?v=1571606036",
			Kind:   "user",
		},
		JoinDate: "2021-10-10",
		Verified: false,
	}

	return &pb.CreateUserResponse{
		User: user,
	}, nil */

	user, err := h.userService.CreateUser(ctx)
	if err != nil {
		return nil, err
	}
	h.logger.Info("User created", zap.Any("user", user))

	/* return &pb.CreateUserResponse{
		User: &pb.User{
			UserId:   user.UserID,
			Username: user.Username,
			Icon: &pb.Icon{
				IconId: user.IconID,
				Link:   user.IconLink,
				Kind:   user.IconKind,
			},
			JoinDate: user.JoinDate,
			Verified: user.Verified,
		},
	}, nil */
	return nil, nil
}

func (h *handlers) GetUser(ctx context.Context, req *pb.GetUserRequest) (*pb.GetUserResponse, error) {
	user := &pb.User{
		UserId:   "123",
		Username: "Snartin",
		Icon: &pb.Icon{
			IconId: "123",
			Link:   "https://emojiisland.com/cdn/shop/products/Very_Angry_Emoji_7f7bb8df-d9dc-4cda-b79f-5453e764d4ea_large.png?v=1571606036",
			Kind:   "user",
		},
		JoinDate: "2021-10-10",
		Verified: false,
	}

	return &pb.GetUserResponse{
		User: user,
	}, nil
}

func (h *handlers) GetUsers(ctx context.Context, req *pb.GetUsersRequest) (*pb.GetUsersResponse, error) {

	user := &pb.User{
		UserId:   "123",
		Username: "Snartin",
		Icon: &pb.Icon{
			IconId: "123",
			Link:   "https://emojiisland.com/cdn/shop/products/Very_Angry_Emoji_7f7bb8df-d9dc-4cda-b79f-5453e764d4ea_large.png?v=1571606036",
			Kind:   "user",
		},
		JoinDate: "2021-10-10",
		Verified: false,
	}

	users := []*pb.User{
		user,
	}
	return &pb.GetUsersResponse{
		Users: users,
	}, nil

}
