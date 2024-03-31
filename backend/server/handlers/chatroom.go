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
}

func (h *handlers) GetChatrooms(ctx context.Context, req *pb.GetChatroomsRequest) (*pb.GetChatroomsResponse, error) {

	//Use the userId from the request to get the chatrooms
	chatrooms, err := h.chatroomService.GetChatrooms(ctx, req.UserId)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to get chatrooms: %v", err)
	}

	h.logger.Info("Chatrooms retrieved", zap.Any("chatrooms", chatrooms))

	//Convert from service.Chatroom to pb.Chatroom
	pbchatrooms := make([]*pb.Chatroom, len(chatrooms))
	for i, chatroom := range chatrooms {
		pbchatrooms[i] = &pb.Chatroom{
			ChatroomId: chatroom.ChatroomId.String(),
			Name:       chatroom.Name,
			Icon: &pb.Icon{
				IconId: chatroom.Icon.IconId.String(),
				Link:   chatroom.Icon.Link,
				Kind:   chatroom.Icon.Kind,
			},
			OwnerId: chatroom.OwnerId.String(),
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
