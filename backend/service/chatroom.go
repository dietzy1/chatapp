package service

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"go.uber.org/zap"
)

type Chatroom struct {
	ChatroomId uuid.UUID
	Name       string
	Icon       Icon
	OwnerId    uuid.UUID
	Channels   []Channel
}

type Channel struct {
	ChannelId uuid.UUID
	Name      string
}

type chatroomService struct {
	logger       *zap.Logger
	chatroomRepo ChatroomRepo
}

type ChatroomRepo interface {
	GetChatrooms(ctx context.Context, userId uuid.UUID) ([]Chatroom, error)
}

func NewChatroomService(logger *zap.Logger, chatroomRepo ChatroomRepo) *chatroomService {
	return &chatroomService{
		logger:       logger,
		chatroomRepo: chatroomRepo,
	}
}

func (c *chatroomService) GetChatrooms(ctx context.Context, userId string) ([]Chatroom, error) {

	if userId == "" {
		c.logger.Info("Recieved the following values", zap.String("userId", userId))
		return nil, fmt.Errorf("userId cannot be empty")
	}

	//parse userId into uuid
	userUUID, err := uuid.Parse(userId)
	if err != nil {
		return nil, fmt.Errorf("failed to parse userId: %w", err)
	}

	chatrooms, err := c.chatroomRepo.GetChatrooms(ctx, userUUID)
	if err != nil {
		return nil, err
	}

	return chatrooms, nil
}
