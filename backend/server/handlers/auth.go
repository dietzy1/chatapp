package handlers

import (
	"context"
	"fmt"
	"io/ioutil"
	"net/http"

	pb "github.com/dietzy1/chatapp/protos/auth/v1"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

const sessionTokenName = "session_token"

type AuthService interface {
	VerifySessionToken(ctx context.Context, sessionToken string) (string, error)
}

func (h *handlers) GetAuth(ctx context.Context, req *pb.GetAuthRequest) (*pb.GetAuthResponse, error) {
	//Delay the response with 60 seconds
	//time.Sleep(120 * time.Second)

	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		h.logger.Info("no metadata")
		return &pb.GetAuthResponse{}, status.Errorf(codes.Unauthenticated, "no metadata")
	}

	sessionToken := md.Get(sessionTokenName)
	if len(sessionToken) == 0 {
		h.logger.Info("no session token")
		return &pb.GetAuthResponse{}, status.Errorf(codes.Unauthenticated, "no session token")
	}

	//Check if the session token is valid by calling into the auth service
	userId, err := h.authService.VerifySessionToken(ctx, sessionToken[0])
	if err != nil {
		h.logger.Info("failed to verify session token", zap.Error(err))
		return &pb.GetAuthResponse{}, status.Errorf(codes.Unauthenticated, "invalid session token")
	}

	return &pb.GetAuthResponse{
		UserId: userId,
	}, nil
}

func (h *handlers) GetMeme(ctx context.Context, req *pb.GetMemeRequest) (*pb.GetMemeResponse, error) {

	//Delay the response with 60 seconds
	//time.Sleep(60 * time.Second)
	response, err := http.Get("https://whatthecommit.com/index.txt")
	if err != nil {
		fmt.Println("Error:", err)
		return nil, nil
	}
	defer response.Body.Close()

	// Read the response body
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		return nil, nil
	}

	// Print the response body
	//fmt.Println(string(body))

	memes := []string{
		string(body),
	}

	return &pb.GetMemeResponse{
		Memes: memes,
	}, nil

}
