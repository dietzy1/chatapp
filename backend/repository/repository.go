package repository

import (
	"context"
	"fmt"

	generated "github.com/dietzy1/chatapp/repository/sqlc"
	"github.com/jackc/pgx/v5"
)

type Config struct {
	DatabaseURL string
}

type repository struct {
	conn  *pgx.Conn
	query *generated.Queries
}

func New(c Config) (*repository, error) {
	ctx := context.Background()

	//Database
	conn, err := pgx.Connect(ctx, c.DatabaseURL)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %v", err)
	}

	if err := conn.Ping(ctx); err != nil {
		return nil, fmt.Errorf("failed to ping database: %v", err)
	}

	queries := generated.New(conn)

	return &repository{
		conn:  conn,
		query: queries,
	}, nil
}
