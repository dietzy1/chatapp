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

func (s *authService) VerifySessionToken(ctx context.Context, sessionToken string) (string, error) {

	if sessionToken == "" {
		return "", fmt.Errorf("session token is empty")
	}

	//Parse into uuid
	token, err := uuid.Parse(sessionToken)
	if err != nil {
		return "", fmt.Errorf("failed to parse session token: %w", err)
	}

	credentials, err := s.authRepo.GetSessionToken(ctx, token)
	if err != nil {
		return "", fmt.Errorf("failed to get session token: %w", err)
	}

	//Compare session token with the one in the database
	if sessionToken != credentials.SessionToken.String() {

		s.logger.Debug("session token does not match", zap.String("session_token", sessionToken), zap.String("credentials_session_token", credentials.SessionToken.String()))
		return "", fmt.Errorf("session token does not match")
	}

	return credentials.UserID.String(), nil
}
