package handlers

import (
	"context"

	pb "github.com/dietzy1/chatapp/protos/chatroom/v1"
)

func (h *handlers) GetChatrooms(ctx context.Context, req *pb.GetChatroomsRequest) (*pb.GetChatroomsResponse, error) {
	icon1 := pb.Icon{
		IconId: "123",
		Link:   "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*vBcaxPJ5OlpYRTb_4rmZ-A.png",
		Kind:   "chatroom",
	}

	icon2 := pb.Icon{
		IconId: "456",
		Link:   "https://rux.vc/wp-content/uploads/2017/12/javascript-fuck-you.jpg",
		Kind:   "chatroom",
	}

	channel1 := &pb.Channel{
		ChannelId: "123",
		Name:      "Glorious JS hate",
	}

	channel2 := &pb.Channel{
		ChannelId: "456",
		Name:      "Bobs secret place",
	}

	channels1 := []*pb.Channel{channel1, channel2}
	channels2 := []*pb.Channel{channel2}

	chatroom1 := &pb.Chatroom{
		ChatroomId:  "123",
		Name:        "Bob's JS haters",
		Description: "For people who hate JS",
		Icon:        &icon1,
		Admin:       "123",
		UserUuids:   []string{"123"},
		Channels:    channels1,
	}
	chatroom2 := &pb.Chatroom{
		ChatroomId:  "456",
		Name:        "Unix enjoyers",
		Description: "For people who enjoy Unix",
		Icon:        &icon2,
		Admin:       "123",
		UserUuids:   []string{"123"},
		Channels:    channels2,
	}

	chatrooms := []*pb.Chatroom{chatroom1, chatroom2}

	return &pb.GetChatroomsResponse{Chatrooms: chatrooms}, nil
}
