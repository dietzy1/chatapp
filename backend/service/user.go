package service

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"go.uber.org/zap"
)

type User struct {
	UserID      uuid.UUID
	Username    string
	IconSrc     string
	Description string
	JoinDate    string
	Verified    bool
}

type userService struct {
	logger *zap.Logger

	repo UserRepo
}

func NewUserService(logger *zap.Logger, repo UserRepo) *userService {
	return &userService{logger: logger, repo: repo}
}

type UserRepo interface {
	CreateUser(ctx context.Context, username, description string, iconId uuid.UUID) (uuid.UUID, uuid.UUID, error)
	GetUser(ctx context.Context, userID uuid.UUID) (User, error)
	GetUsers(ctx context.Context, chatroomID uuid.UUID) ([]User, error)
}

func (u *userService) CreateUser(ctx context.Context, username, description, iconId string) (string, string, error) {

	if username == "" || description == "" || iconId == "" {
		u.logger.Info("Recieved the following values", zap.String("username", username), zap.String("description", description), zap.String("iconId", iconId))
		return "", "", fmt.Errorf("username, description or iconID cannot be empty")
	}

	//parse iconId into uuid
	iconUUID, err := uuid.Parse(iconId)
	if err != nil {
		return "", "", fmt.Errorf("failed to parse iconID: %w", err)
	}

	//Verified being true means that a lookup is possible in the auth table
	userId, sessionToken, err := u.repo.CreateUser(ctx, username, description, iconUUID)
	if err != nil {
		return "", "", err
	}

	return userId.String(), sessionToken.String(), nil
}

func (u *userService) GetUser(ctx context.Context, userID string) (User, error) {

	if userID == "" {
		return User{}, fmt.Errorf("userID cannot be empty")
	}

	userUUID, err := uuid.Parse(userID)
	if err != nil {
		return User{}, fmt.Errorf("failed to parse userID: %w", err)
	}

	user, err := u.repo.GetUser(ctx, userUUID)
	if err != nil {
		return User{}, fmt.Errorf("failed to get user: %w", err)
	}

	return user, nil
}

func (u *userService) GetUsers(ctx context.Context, chatroomID string) ([]User, error) {

	if chatroomID == "" {
		u.logger.Info("Recieved the following values", zap.String("chatroomID", chatroomID))
		return nil, fmt.Errorf("chatroomID cannot be empty")
	}

	chatroomUUID, err := uuid.Parse(chatroomID)
	if err != nil {
		return nil, fmt.Errorf("failed to parse chatroomID: %w", err)
	}

	users, err := u.repo.GetUsers(ctx, chatroomUUID)
	if err != nil {
		return nil, err
	}

	return users, nil
}
