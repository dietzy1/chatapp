package repository

import (
	"context"
	"fmt"
	"time"

	generated "github.com/dietzy1/chatapp/repository/sqlc"
	"github.com/jackc/pgx/v5/pgxpool"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type Config struct {
	PostgressURL string
	MongoURL     string
}

type repository struct {
	postgres *postgres
	mongodb  *mongodb
}

type postgres struct {
	pool  *pgxpool.Pool
	query *generated.Queries
}

type mongodb struct {
	client *mongo.Client
}

func New(c *Config) (*repository, error) {

	//Mongodb
	mongoRepo, err := NewMongo(c)
	if err != nil {
		return nil, err
	}

	//Postgress
	postgresRepo, err := NewPostgres(c)
	if err != nil {
		return nil, err
	}

	return &repository{
		postgres: postgresRepo,
		mongodb:  mongoRepo,
	}, nil

}

func NewMongo(c *Config) (*mongodb, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(c.MongoURL))
	if err != nil {
		return nil, err
	}
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		return nil, err
	}

	return &mongodb{client: client}, nil
}

func NewPostgres(c *Config) (*postgres, error) {
	ctx := context.Background()

	pool, err := pgxpool.New(ctx, c.PostgressURL)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %v", err)
	}

	if err := pool.Ping(ctx); err != nil {
		return nil, fmt.Errorf("failed to ping database: %v", err)
	}

	queries := generated.New(pool)

	return &postgres{
		pool:  pool,
		query: queries,
	}, nil
}
