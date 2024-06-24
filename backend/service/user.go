package service

import (
	"context"
	"fmt"
	"strings"

	"github.com/google/uuid"
	"go.uber.org/zap"
	"golang.org/x/crypto/bcrypt"
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
	CreateUser(ctx context.Context, username, iconSrc string) (uuid.UUID, uuid.UUID, error)
	GetUser(ctx context.Context, userID uuid.UUID) (User, error)
	GetUsers(ctx context.Context, chatroomID uuid.UUID) ([]User, error)
	VerifyUser(ctx context.Context, userID uuid.UUID, hashedPassword string) error
}

func (u *userService) CreateUser(ctx context.Context, username, IconSrc string) (string, string, error) {

	if username == "" || IconSrc == "" {
		u.logger.Info("Recieved the following values", zap.String("username", username), zap.String("iconSrc", IconSrc))
		return "", "", fmt.Errorf("username, description or iconSrc cannot be empty")
	}

	//Verified being true means that a lookup is possible in the auth table
	userId, sessionToken, err := u.repo.CreateUser(ctx, username, IconSrc)
	if err != nil {
		if strings.Contains(err.Error(), "username already exists") {
			// This error is specifically for when the username already exists
			u.logger.Error("Username already exists", zap.Error(err))
			return "", "", fmt.Errorf("a user with the given username already exists")
		}
		// Log and return the generic error if it's not a unique constraint violation
		u.logger.Error("Error creating user", zap.Error(err))
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

func (u *userService) VerifyUser(ctx context.Context, userID, password string) error {

	if userID == "" || password == "" {
		return fmt.Errorf("userID or password cannot be empty")
	}

	userUUID, err := uuid.Parse(userID)
	if err != nil {
		return fmt.Errorf("failed to parse userID: %w", err)
	}

	//Bcypt the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("failed to hash password: %w", err)
	}

	if err := u.repo.VerifyUser(ctx, userUUID, string(hashedPassword)); err != nil {
		return fmt.Errorf("failed to verify user: %w", err)
	}

	return nil
}
