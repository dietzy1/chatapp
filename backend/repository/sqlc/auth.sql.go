// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: auth.sql

package generated

import (
	"context"

	"github.com/google/uuid"
)

const getSessionToken = `-- name: GetSessionToken :one
SELECT
    user_id,
    session_token
FROM
    credentials
WHERE
    session_token = $1
`

type GetSessionTokenRow struct {
	UserID       uuid.UUID
	SessionToken uuid.UUID
}

func (q *Queries) GetSessionToken(ctx context.Context, sessionToken uuid.UUID) (GetSessionTokenRow, error) {
	row := q.db.QueryRow(ctx, getSessionToken, sessionToken)
	var i GetSessionTokenRow
	err := row.Scan(&i.UserID, &i.SessionToken)
	return i, err
}