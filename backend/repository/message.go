package repository

import (
	"context"
	"fmt"

	"github.com/dietzy1/chatapp/service"
	"go.mongodb.org/mongo-driver/bson"
)

const database = "Message-Database"

// We want to add in some timestamp stuff later perhabs
func (r *repository) GetMessages(ctx context.Context, chatroomId, channelId string) ([]service.Message, error) {
	collection := r.mongodb.client.Database(database).Collection(chatroomId)

	messages := []service.Message{}

	pipeline := bson.A{
		bson.M{"$match": bson.M{"channelId": channelId}},
		bson.M{"$sort": bson.M{"_id": -1}},
		bson.M{"$limit": 50},
		bson.M{"$sort": bson.M{"_id": 1}}, // Add this stage to reverse the order
	}

	cursor, err := collection.Aggregate(ctx, pipeline)
	if err != nil {
		return messages, err
	}

	defer cursor.Close(ctx)

	if err = cursor.All(ctx, &messages); err != nil {
		return messages, fmt.Errorf("failed to decode messages: %w", err)
	}

	return messages, nil
}

func (r *repository) AddMessage(ctx context.Context, msg service.Message) error {
	collection := r.mongodb.client.Database(database).Collection(msg.ChatroomId)
	_, err := collection.InsertOne(ctx, msg)
	if err != nil {
		return fmt.Errorf("failed to insert message: %w", err)
	}

	return nil
}
