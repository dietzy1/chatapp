package service

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"go.uber.org/zap"
	"golang.org/x/crypto/bcrypt"
)

type Credentials struct {
	UserID       uuid.UUID
	SessionToken uuid.UUID
	HashedPass   string
}

type AuthRepository interface {
	GetSessionToken(ctx context.Context, sessionToken uuid.UUID) (Credentials, error)
	DeleteSessionToken(ctx context.Context, sessionToken, userId uuid.UUID) error
	GetHashedPassword(ctx context.Context, username string) (Credentials, error)
	AddSessionToken(ctx context.Context, sessionToken, userId uuid.UUID) error
}

type authService struct {
	logger   *zap.Logger
	authRepo AuthRepository
}

func NewAuthService(logger *zap.Logger, authRepo AuthRepository) *authService {
	return &authService{
		logger:   logger,
		authRepo: authRepo,
	}
}

func (a *authService) VerifySessionToken(ctx context.Context, sessionToken string) (string, error) {

	if sessionToken == "" {
		return "", fmt.Errorf("session token is empty")
	}

	//Parse into uuid
	token, err := uuid.Parse(sessionToken)
	if err != nil {
		return "", fmt.Errorf("failed to parse session token: %w", err)
	}

	credentials, err := a.authRepo.GetSessionToken(ctx, token)
	if err != nil {
		return "", fmt.Errorf("failed to get session token: %w", err)
	}

	//Compare session token with the one in the database
	if sessionToken != credentials.SessionToken.String() {

		a.logger.Debug("session token does not match", zap.String("session_token", sessionToken), zap.String("credentials_session_token", credentials.SessionToken.String()))
		return "", fmt.Errorf("session token does not match")
	}

	return credentials.UserID.String(), nil
}

func (a *authService) DeleteSessionToken(ctx context.Context, sessionToken, userId string) error {

	if sessionToken == "" || userId == "" {
		return fmt.Errorf("session token or user id cannot be empty")
	}

	//Parse into uuid
	parsedToken, err := uuid.Parse(sessionToken)
	if err != nil {
		return fmt.Errorf("failed to parse session token: %w", err)
	}

	//Parse into uuid
	parsedUserId, err := uuid.Parse(userId)
	if err != nil {
		return fmt.Errorf("failed to parse user id: %w", err)
	}

	if err := a.authRepo.DeleteSessionToken(ctx, parsedToken, parsedUserId); err != nil {
		return fmt.Errorf("failed to delete session token: %w", err)
	}

	return nil
}

func (a *authService) Login(ctx context.Context, username, password string) (string, error) {

	if username == "" || password == "" {
		return "", fmt.Errorf("username or password cannot be empty")
	}

	//retrieve password from the database
	credentials, err := a.authRepo.GetHashedPassword(ctx, username)
	if err != nil {
		return "", fmt.Errorf("failed to get hashed password: %w", err)
	}

	//Compare the hashed password with the password
	if err := bcrypt.CompareHashAndPassword([]byte(credentials.HashedPass), []byte(password)); err != nil {
		return "", fmt.Errorf("password does not match: %w", err)
	}

	//Generate a session token
	sessionToken, err := uuid.NewRandom()
	if err != nil {
		return "", fmt.Errorf("failed to generate session token: %w", err)
	}

	//Add the session token to the database
	if err := a.authRepo.AddSessionToken(ctx, sessionToken, credentials.UserID); err != nil {
		return "", fmt.Errorf("failed to add session token: %w", err)
	}

	return sessionToken.String(), nil
}
