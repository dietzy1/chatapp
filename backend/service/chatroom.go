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
	IconSrc    string
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
	CreateChatroom(ctx context.Context, name, iconSrc string, ownerUUID uuid.UUID) (string, error)
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

func (c *chatroomService) CreateChatroom(ctx context.Context, name, ownerId string) (string, error) {

	//log the values recieved
	c.logger.Info("Recieved the following values", zap.String("name", name), zap.String("ownerId", ownerId))

	if name == "" || ownerId == "" {
		return "", fmt.Errorf("name or ownerId cannot be empty")
	}

	//parse ownerId into uuid
	ownerUUID, err := uuid.Parse(ownerId)
	if err != nil {
		return "", fmt.Errorf("failed to parse ownerId: %w", err)
	}

	firstLetter := name[0:1]

	iconSrc := "https://fakeimg.pl/100x100/171717/ffffff?text=" + firstLetter

	chatroomId, err := c.chatroomRepo.CreateChatroom(ctx, name, iconSrc, ownerUUID)
	if err != nil {
		return "", err
	}

	return chatroomId, nil
}
