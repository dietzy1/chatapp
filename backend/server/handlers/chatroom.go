package handlers

import (
	"context"

	pb "github.com/dietzy1/chatapp/protos/chatroom/v1"
	"github.com/dietzy1/chatapp/service"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type ChatroomService interface {
	GetChatrooms(ctx context.Context, userId string) ([]service.Chatroom, error)
	CreateChatroom(ctx context.Context, name, ownerId string) (string, error)
}

func (h *handlers) GetChatrooms(ctx context.Context, req *pb.GetChatroomsRequest) (*pb.GetChatroomsResponse, error) {

	//Use the userId from the request to get the chatrooms
	chatrooms, err := h.chatroomService.GetChatrooms(ctx, req.UserId)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to get chatrooms: %v", err)
	}

	//Convert from service.Chatroom to pb.Chatroom
	pbchatrooms := make([]*pb.Chatroom, len(chatrooms))
	for i, chatroom := range chatrooms {
		pbchatrooms[i] = &pb.Chatroom{
			ChatroomId: chatroom.ChatroomId.String(),
			Name:       chatroom.Name,
			IconSrc:    chatroom.IconSrc,
			OwnerId:    chatroom.OwnerId.String(),
			Channels: func() []*pb.Channel {
				pbchannels := make([]*pb.Channel, len(chatroom.Channels))
				for j, channel := range chatroom.Channels {
					pbchannels[j] = &pb.Channel{
						ChannelId: channel.ChannelId.String(),
						Name:      channel.Name,
					}
				}

				return pbchannels
			}(),
		}
	}

	return &pb.GetChatroomsResponse{
		Chatrooms: pbchatrooms,
	}, nil
}

func (h *handlers) CreateChatroom(ctx context.Context, req *pb.CreateChatroomRequest) (*pb.CreateChatroomResponse, error) {

	//Create the chatroom
	chatroomId, err := h.chatroomService.CreateChatroom(ctx, req.Name, req.OwnerId)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to create chatroom: %v", err)
	}

	h.logger.Info("Chatroom created: ", zap.String("chatroomId", chatroomId))

	return &pb.CreateChatroomResponse{ChatroomId: chatroomId}, nil
}

/* func (h *handlers) CreateChannel(ctx context.Context, req *pb.CreateChannelRequest) (*pb.CreateChannelResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateChannel not implemented")
} */
