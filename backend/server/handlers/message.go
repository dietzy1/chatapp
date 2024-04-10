package handlers

import (
	"context"

	pb "github.com/dietzy1/chatapp/protos/message/v1"
	"github.com/dietzy1/chatapp/service"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type MessageService interface {
	GetMessages(ctx context.Context, chatroomId, channelId string) ([]service.Message, error)
}

func (h *handlers) GetMessages(ctx context.Context, req *pb.GetMessagesRequest) (*pb.GetMessagesResponse, error) {

	messages, err := h.messageService.GetMessages(ctx, req.ChatroomId, req.ChannelId)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to get messages: %v", err)
	}

	h.logger.Info("Messages retrieved", zap.Any("messages", messages))

	return &pb.GetMessagesResponse{
		Messages: nil,
	}, nil

}
