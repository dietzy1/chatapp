// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0

package generated

import (
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type Channel struct {
	ChannelID   uuid.UUID
	ChannelName string
	ChatroomID  uuid.UUID
}

type Chatroom struct {
	ChatroomID   uuid.UUID
	ChatroomName string
	IconID       uuid.UUID
	OwnerID      uuid.UUID
}

type ChatroomUser struct {
	ChatroomID uuid.UUID
	UserID     uuid.UUID
}

type Credential struct {
	UserID       uuid.UUID
	HashPassword pgtype.Text
	SessionToken uuid.UUID
}

type Icon struct {
	IconID    uuid.UUID
	Kind      string
	Link      string
	IsDefault bool
}

type User struct {
	UserID          uuid.UUID
	Username        string
	IconID          uuid.UUID
	UserDescription string
	JoinDate        pgtype.Date
	Verified        bool
}
