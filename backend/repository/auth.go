package repository

import (
	"context"
	"fmt"

	generated "github.com/dietzy1/chatapp/repository/sqlc"
	"github.com/dietzy1/chatapp/service"
	"github.com/google/uuid"
)

func (r *repository) GetSessionToken(ctx context.Context, sessionToken uuid.UUID) (service.Credentials, error) {

	result, err := r.postgres.query.GetSessionToken(ctx, sessionToken)
	if err != nil {
		return service.Credentials{}, fmt.Errorf("failed to get session token: %w", err)
	}

	return service.Credentials{
		UserID:       result.UserID,
		SessionToken: result.SessionToken,
	}, nil
}

func (r *repository) DeleteSessionToken(ctx context.Context, sessionToken, userId uuid.UUID) error {

	err := r.postgres.query.NullifySessionToken(ctx, generated.NullifySessionTokenParams{
		SessionToken: sessionToken,
		UserID:       userId,
	})
	if err != nil {
		return fmt.Errorf("failed to delete session token: %w", err)
	}

	return nil
}
