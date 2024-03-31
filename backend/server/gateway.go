package server

import (
	"context"
	"fmt"
	"net/http"

	"github.com/dietzy1/chatapp/server/handlers"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func (s *server) RunGateway() error {

	//The reverse proxy connects to the GRPC server
	conn, err := grpc.DialContext(
		context.Background(),
		/* "dns:///0.0.0.0:8080", */
		"dns:///0.0.0.0"+s.config.Addr,
		grpc.WithBlock(),
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
	if err != nil {
		return fmt.Errorf("failed to dial: %v", err)
	}

	incomingHeader := incomingHeaderMatcherWrapper(s.logger)
	//intercepts the response and sets the cookie
	forwardResponse := withForwardResponseOptionWrapper(s.logger)

	//intercepts the request and sets the cookie
	withMetaData := withMetaDataWrapper(s.logger)

	//Main mux where options are added in -- no options are needed for now
	gwmux := runtime.NewServeMux(incomingHeader, forwardResponse, withMetaData)

	//Call function which handles registering services to the gateway
	if err := handlers.RegisterGateway(context.Background(), gwmux, conn); err != nil {
		return err
	}

	mw := wrapperAuthMiddleware(s.logger)
	middleware := mw((corsMiddleware(gwmux)))

	gwServer := &http.Server{
		Addr:    s.config.GatewayAddr,
		Handler: middleware,
	}
	//Assign to server struct so we can gracefully shutdown
	s.gwServer = gwServer

	fmt.Println("Starting gateway server on port:", s.config.GatewayAddr)
	if err := gwServer.ListenAndServe(); err != nil {
		return fmt.Errorf("failed to listen and serve: %v", err)
	}

	return nil
}
