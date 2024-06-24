package repository

import (
	"context"
	"fmt"

	generated "github.com/dietzy1/chatapp/repository/sqlc"
	"github.com/dietzy1/chatapp/service"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
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
			IconSrc:    v.IconSrc,
		}

		chatroomSlice = append(chatroomSlice, chatroom)
	}

	return chatroomSlice, nil
}

func (r *repository) CreateChatroom(ctx context.Context, name, iconSrc string, ownerUUID uuid.UUID) (string, error) {

	//Do transaction
	tx, err := r.postgres.pool.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return "", fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback(ctx)
	fmt.Println("Transaction started")

	//Create transaction object
	qtx := r.postgres.query.WithTx(tx)

	//Create chatroom
	chatroomId, err := qtx.InsertChatroom(ctx, generated.InsertChatroomParams{
		ChatroomName: name,
		OwnerID:      ownerUUID,
		IconSrc:      iconSrc,
	})
	if err != nil {
		return "", fmt.Errorf("failed to insert chatroom: %w", err)
	}

	//Add chennel to chatroom
	if err := qtx.InsertChannel(ctx, generated.InsertChannelParams{
		ChannelName: "General",
		ChatroomID:  chatroomId,
	}); err != nil {
		return "", fmt.Errorf("failed to insert channel: %w", err)
	}

	//Add user to junction table
	if err := qtx.InsertChatroomUser(ctx, generated.InsertChatroomUserParams{
		ChatroomID: chatroomId,
		UserID:     ownerUUID,
	}); err != nil {
		return "", fmt.Errorf("failed to insert chatroom user: %w", err)
	}

	if err := tx.Commit(ctx); err != nil {
		return "", fmt.Errorf("failed to commit transaction: %w", err)
	}

	return chatroomId.String(), nil
}
