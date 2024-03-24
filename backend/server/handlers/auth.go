package handlers

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	pb "github.com/dietzy1/chatapp/protos/auth/v1"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

func (h *handlers) GetAuth(ctx context.Context, req *pb.GetAuthRequest) (*pb.GetAuthResponse, error) {
	//Delay the response with 60 seconds
	//time.Sleep(60 * time.Second)

	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		log.Println("no metadata")
		return &pb.GetAuthResponse{}, status.Errorf(codes.Unauthenticated, "no metadata")
	}
	h.logger.Debug("metadata", zap.Any("metadata", md))

	return &pb.GetAuthResponse{
		UserId: "123",
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
