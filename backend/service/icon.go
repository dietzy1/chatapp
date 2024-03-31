package service

import (
	"github.com/google/uuid"
	"go.uber.org/zap"
)

// Enum for kind of icon
const (
	UserIcon     = "user"
	ChatroomIcon = "chatroom"
)

type Icon struct {
	IconId uuid.UUID
	Link   string
	Kind   string
}

type IconRepo interface {
	/* CreateIcon() (Icon, error) */
}

type Cdn interface {
	/* UploadImage() (string, error) */
}

type iconService struct {
	logger *zap.Logger
	cdn    Cdn
	repo   IconRepo
}

func NewIconService(logger *zap.Logger, repo IconRepo, cdn Cdn) *iconService {
	return &iconService{logger: logger, repo: repo, cdn: cdn}
}
