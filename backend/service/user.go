package service

import "go.uber.org/zap"

type User struct {
	Id       string
	Username string
}

type UserService struct {
	logger *zap.Logger
}

func NewUserService(logger *zap.Logger) *UserService {
	return &UserService{logger: logger}
}

func (u *UserService) CreateUser() (*User, error) {
	return &User{Id: "123", Username: "Snartin"}, nil
}

/* const response: GetUserResponse = {
  name: "Bob",
  uuid: "1234",
  icon: {
    uuid: "1234",
    link: "https://github.com/shadcn.png",
  },
  description: "I am Bob",
  joinDate: "2021-01-01T00:00:00.000Z",
  chatServers: ["1234", "5678"],
}; */
