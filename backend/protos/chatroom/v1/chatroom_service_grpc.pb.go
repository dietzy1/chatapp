// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             (unknown)
// source: chatroom/v1/chatroom_service.proto

package chatroom_v1

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// ChatroomServiceClient is the client API for ChatroomService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ChatroomServiceClient interface {
	GetChatrooms(ctx context.Context, in *GetChatroomsRequest, opts ...grpc.CallOption) (*GetChatroomsResponse, error)
	CreateChatroom(ctx context.Context, in *CreateChatroomRequest, opts ...grpc.CallOption) (*CreateChatroomResponse, error)
}

type chatroomServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewChatroomServiceClient(cc grpc.ClientConnInterface) ChatroomServiceClient {
	return &chatroomServiceClient{cc}
}

func (c *chatroomServiceClient) GetChatrooms(ctx context.Context, in *GetChatroomsRequest, opts ...grpc.CallOption) (*GetChatroomsResponse, error) {
	out := new(GetChatroomsResponse)
	err := c.cc.Invoke(ctx, "/chatroom.v1.ChatroomService/GetChatrooms", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *chatroomServiceClient) CreateChatroom(ctx context.Context, in *CreateChatroomRequest, opts ...grpc.CallOption) (*CreateChatroomResponse, error) {
	out := new(CreateChatroomResponse)
	err := c.cc.Invoke(ctx, "/chatroom.v1.ChatroomService/CreateChatroom", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ChatroomServiceServer is the server API for ChatroomService service.
// All implementations should embed UnimplementedChatroomServiceServer
// for forward compatibility
type ChatroomServiceServer interface {
	GetChatrooms(context.Context, *GetChatroomsRequest) (*GetChatroomsResponse, error)
	CreateChatroom(context.Context, *CreateChatroomRequest) (*CreateChatroomResponse, error)
}

// UnimplementedChatroomServiceServer should be embedded to have forward compatible implementations.
type UnimplementedChatroomServiceServer struct {
}

func (UnimplementedChatroomServiceServer) GetChatrooms(context.Context, *GetChatroomsRequest) (*GetChatroomsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetChatrooms not implemented")
}
func (UnimplementedChatroomServiceServer) CreateChatroom(context.Context, *CreateChatroomRequest) (*CreateChatroomResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateChatroom not implemented")
}

// UnsafeChatroomServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ChatroomServiceServer will
// result in compilation errors.
type UnsafeChatroomServiceServer interface {
	mustEmbedUnimplementedChatroomServiceServer()
}

func RegisterChatroomServiceServer(s grpc.ServiceRegistrar, srv ChatroomServiceServer) {
	s.RegisterService(&ChatroomService_ServiceDesc, srv)
}

func _ChatroomService_GetChatrooms_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetChatroomsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ChatroomServiceServer).GetChatrooms(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/chatroom.v1.ChatroomService/GetChatrooms",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ChatroomServiceServer).GetChatrooms(ctx, req.(*GetChatroomsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _ChatroomService_CreateChatroom_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateChatroomRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ChatroomServiceServer).CreateChatroom(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/chatroom.v1.ChatroomService/CreateChatroom",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ChatroomServiceServer).CreateChatroom(ctx, req.(*CreateChatroomRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// ChatroomService_ServiceDesc is the grpc.ServiceDesc for ChatroomService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var ChatroomService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "chatroom.v1.ChatroomService",
	HandlerType: (*ChatroomServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetChatrooms",
			Handler:    _ChatroomService_GetChatrooms_Handler,
		},
		{
			MethodName: "CreateChatroom",
			Handler:    _ChatroomService_CreateChatroom_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "chatroom/v1/chatroom_service.proto",
}
