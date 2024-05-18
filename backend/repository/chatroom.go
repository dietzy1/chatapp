package repository

import (
	"context"
	"fmt"

	"github.com/dietzy1/chatapp/service"
	"github.com/google/uuid"
)

func (r *repository) GetChatrooms(ctx context.Context, userId uuid.UUID) ([]service.Chatroom, error) {

	chatrooms, err := r.postgres.query.GetChatrooms(ctx, userId)
	if err != nil {
		return nil, fmt.Errorf("failed to get chatrooms: %w", err)
	}

	channels, err := r.postgres.query.GetChannels(ctx, userId)
	if err != nil {
		return nil, fmt.Errorf("failed to get channels: %w", err)
	}

	chatroomSlice := []service.Chatroom{}

	for _, v := range chatrooms {
		//find all channels that belong to the chatroom
		var channelSlice []service.Channel
		for _, c := range channels {
			if c.ChatroomID == v.ChatroomID {
				channel := service.Channel{
					ChannelId: c.ChannelID,
					Name:      c.ChannelName,
				}
				channelSlice = append(channelSlice, channel)
			}
		}

		//Create service.chatroom object
		chatroom := service.Chatroom{
			ChatroomId: v.ChatroomID,
			Name:       v.ChatroomName,
			OwnerId:    v.OwnerID,
			Channels:   channelSlice,
		}

		chatroomSlice = append(chatroomSlice, chatroom)
	}

	return chatroomSlice, nil
}
