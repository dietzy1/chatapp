package repository

import (
	"context"

	"github.com/dietzy1/chatapp/service"
	"github.com/google/uuid"
)

func (r *repository) GetMessages(ctx context.Context, chatroomId, channelId uuid.UUID) ([]service.Message, error) {
	return nil, nil
}

func (r *repository) CreateMessage(ctx context.Context, msg service.CreateMessage) (service.Message, error) {

	return service.Message{}, nil
}
