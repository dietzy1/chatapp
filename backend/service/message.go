package service

import (
	"context"
	"fmt"
	"time"

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

type Kind string

const (
	MESSAGE Kind = "MESSAGE"
	GIF     Kind = "GIF"
)

//fix for later perhabs: https://gist.github.com/SupaHam/3afe982dc75039356723600ccc91ff77

// Mongo doesn't like the UUID type, so we'll use string instead
type Message struct {
	Kind       Kind   `json:"kind" bson:"kind"`
	MessageId  string `json:"messageId" bson:"messageId"`
	ChannelId  string `json:"channelId" bson:"channelId"`
	ChatroomId string `json:"chatroomId" bson:"chatroomId"`
	UserId     string `json:"userId" bson:"userId"`
	Content    string `json:"content" bson:"content"`
	CreatedAt  string `json:"createdAt" bson:"createdAt"`
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
	//GetMessages(ctx context.Context, chatroomId, channelId uuid.UUID) ([]Message, error)
	// CreateMessage(ctx context.Context, msg CreateMessage) (Message, error)
	AddMessage(ctx context.Context, msg Message) error
	GetMessages(ctx context.Context, chatroomId, channelId string) ([]Message, error)
}

func (m *messageService) GetMessages(ctx context.Context, chatroomId, channelId string) ([]Message, error) {
	//Confirm neither chatroomId or channelId are empty
	if chatroomId == "" || channelId == "" {
		return nil, fmt.Errorf("chatroomId or channelId cannot be empty")
	}

	messages, err := m.repo.GetMessages(ctx, chatroomId, channelId)
	if err != nil {
		return nil, err
	}

	return messages, nil
}

type CreateMessage struct {
	Kind       Kind   `json:"kind"`
	ChannelId  string `json:"channelId"`
	ChatroomId string `json:"chatroomId"`
	UserId     string `json:"userId"`
	Content    string `json:"content"`
}

func (m *messageService) CreateMessage(ctx context.Context, msg CreateMessage) (Message, error) {

	//Confirm if the message is empty
	if msg.Content == "" || msg.UserId == "" || msg.ChatroomId == "" || msg.ChannelId == "" {
		return Message{}, fmt.Errorf("message cannot be empty")
	}

	if msg.Kind != MESSAGE && msg.Kind != GIF {
		return Message{}, fmt.Errorf("Message kind must be either MESSAGE or GIF")
	}

	message := Message{
		MessageId:  uuid.New().String(),
		ChannelId:  msg.ChannelId,
		ChatroomId: msg.ChatroomId,
		UserId:     msg.UserId,
		Content:    msg.Content,
		CreatedAt:  time.Now().Format(time.RFC3339),
	}

	//Print formattted message to the console
	m.logger.Info("Message created", zap.Any("message", message))

	err := m.repo.AddMessage(ctx, message)
	if err != nil {
		return Message{}, err
	}

	return message, nil
}
