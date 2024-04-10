package repository

import (
	"context"
	"fmt"

	generated "github.com/dietzy1/chatapp/repository/sqlc"
	"github.com/dietzy1/chatapp/service"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

const primaryChatroomId = "4ed6de81-dedb-47ab-92f5-04d5e23fb71a"

func (r *repository) CreateUser(ctx context.Context, username, description string, iconId uuid.UUID) (uuid.UUID, uuid.UUID, error) {

	tx, err := r.pool.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return uuid.Nil, uuid.Nil, fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback(ctx)
	fmt.Println("Transaction started")

	//Create transaction object
	qtx := r.query.WithTx(tx)

	//2. Create a user in the database
	userId, err := qtx.CreateUser(ctx, generated.CreateUserParams{
		Username:        username,
		UserDescription: description,
		IconID:          iconId,
	})
	if err != nil {
		return uuid.Nil, uuid.Nil, fmt.Errorf("failed to create user: %w", err)
	}

	chatroomUuid, err := uuid.Parse(primaryChatroomId)
	if err != nil {
		fmt.Println("Error parsing UUID:", err)
		return uuid.Nil, uuid.Nil, fmt.Errorf("failed to parse hardcoded chatroom UUID: %w", err)
	}

	//3. Add user to main chatroom
	if err := qtx.AddUserToChatroom(ctx, generated.AddUserToChatroomParams{
		ChatroomID: chatroomUuid,
		UserID:     userId,
	}); err != nil {
		return uuid.Nil, uuid.Nil, fmt.Errorf("failed to add user to chatroom: %w", err)
	}

	//4. Add user to the credentials table without hashed password but with permanent session token
	sessionToken, err := qtx.AddUserToCredentials(ctx, userId)
	if err != nil {
		return uuid.Nil, uuid.Nil, fmt.Errorf("failed to add user to credentials: %w", err)
	}

	if err := tx.Commit(ctx); err != nil {
		return uuid.Nil, uuid.Nil, fmt.Errorf("failed to commit transaction: %w", err)
	}

	return userId, sessionToken, nil
}

func (r *repository) GetUser(ctx context.Context, userID uuid.UUID) (service.User, error) {

	user, err := r.query.GetUserAndIcon(ctx, userID)
	if err != nil {
		return service.User{}, fmt.Errorf("failed to get user: %w", err)
	}

	return service.User{
		UserID:      user.UserID,
		Username:    user.Username,
		Description: user.UserDescription,
		Icon: service.Icon{
			IconId: user.IconID,
			Link:   user.Link.String,
			Kind:   user.Kind.String,
		},
		JoinDate: user.JoinDate.Time.String(),
		Verified: user.Verified,
	}, nil
}

func (r *repository) GetUsers(ctx context.Context, chatroomID uuid.UUID) ([]service.User, error) {
	users, err := r.query.GetUsersInChatroom(ctx, chatroomID)
	if err != nil {
		return nil, fmt.Errorf("failed to get users: %w", err)
	}

	userSlice := []service.User{}

	for _, v := range users {
		user := service.User{
			UserID:      v.UserID,
			Username:    v.Username,
			Description: v.UserDescription,
			Icon: service.Icon{
				IconId: v.IconID,
				Link:   v.IconLink.String,
				Kind:   v.IconKind.String,
			},
			JoinDate: v.JoinDate.Time.String(),
			Verified: v.Verified,
		}

		userSlice = append(userSlice, user)
	}

	return userSlice, nil
}
