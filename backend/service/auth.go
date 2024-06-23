package service

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"go.uber.org/zap"
)

type Credentials struct {
	UserID       uuid.UUID
	SessionToken uuid.UUID
	HashedPass   string
}

type AuthRepository interface {
	GetSessionToken(ctx context.Context, sessionToken uuid.UUID) (Credentials, error)
	DeleteSessionToken(ctx context.Context, sessionToken, userId uuid.UUID) error
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
