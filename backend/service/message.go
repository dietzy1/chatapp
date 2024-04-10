package service

import (
	"context"

	"github.com/google/uuid"
	"go.uber.org/zap"
)

/* message Message {
	string message_id = 1;
	string channel_id = 2;
	string chatroom_id = 3;
	string user_id = 4;
	string content = 5;
	string created_at = 6;
	optional string updated_at = 7;
  } */

type Message struct {
	MessageId  uuid.UUID
	ChannelId  uuid.UUID
	ChatroomId uuid.UUID
	UserId     uuid.UUID
	Content    string
	CreatedAt  string
	UpdatedAt  string
}

type messageService struct {
	logger *zap.Logger
	repo   MessageRepository
}

func NewMessageService(logger *zap.Logger, repo MessageRepository) *messageService {
	return &messageService{logger: logger,
		repo: repo,
	}
}

type MessageRepository interface {
	GetMessages(ctx context.Context, chatroomId, channelId uuid.UUID) ([]Message, error)
	CreateMessage(ctx context.Context, msg CreateMessage) (Message, error)
}

func (m *messageService) GetMessages(ctx context.Context, chatroomId, channelId string) ([]Message, error) {
	return nil, nil
}

type CreateMessage struct {
	ChannelId  uuid.UUID
	ChatroomId uuid.UUID
	UserId     uuid.UUID
	Content    string
}

func (m *messageService) CreateMessage(ctx context.Context, msg CreateMessage) (Message, error) {
	return Message{}, nil
}
