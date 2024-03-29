// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: user.sql

package repository

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const createUser = `-- name: CreateUser :exec
INSERT INTO
  users (user_id, username, icon_id, join_date, verified)
VALUES
  ($1, $2, $3, $4, $5)
`

type CreateUserParams struct {
	UserID   int32
	Username string
	IconID   int32
	JoinDate pgtype.Date
	Verified bool
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) error {
	_, err := q.db.Exec(ctx, createUser,
		arg.UserID,
		arg.Username,
		arg.IconID,
		arg.JoinDate,
		arg.Verified,
	)
	return err
}
