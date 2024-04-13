package repository

import (
	"context"
	"fmt"

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
