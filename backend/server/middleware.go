package server

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"regexp"
	"time"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"

	"go.uber.org/zap"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
	"google.golang.org/protobuf/proto"
)

func loggingMiddleware(
	logger *zap.Logger,
) grpc.UnaryServerInterceptor {
	return func(
		ctx context.Context,
		req interface{},
		info *grpc.UnaryServerInfo,
		handler grpc.UnaryHandler,
	) (interface{}, error) {
		logger.Info("gRPC method", zap.String("method", info.FullMethod))
		resp, err := handler(ctx, req)
		if err != nil {
			logger.Error("gRPC method encountered an error", zap.Error(err))
		}

		return resp, err
	}
}

// CORS middleware wrapper that allows origins -- configured in ENV
func corsMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if allowedOrigin(r.Header.Get("Origin")) {
			w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
			w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization, ResponseType, Origin")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
		}
		if r.Method == "OPTIONS" {
			return
		}
		h.ServeHTTP(w, r)

	})
}

// Reads ENV file and determines if origin should be * or regex matching
func allowedOrigin(origin string) bool {
	if os.Getenv("CORS") == "*" {

		return true
	}
	if matched, _ := regexp.MatchString(os.Getenv(("CORS")), origin); matched {
		return true
	}
	return false
}

const (
	loginRoute        = "/authgateway.v1.AuthGatewayService/Login"
	registerRoute     = "/authgateway.v1.AuthGatewayService/Register"
	authenticateRoute = "/authgateway.v1.AuthGatewayService/Authenticate"
	logoutRoute       = "/authgateway.v1.AuthGatewayService/Logout"
)

func wrapperAuthMiddleware() func(http.Handler) http.Handler {
	return func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			//if the request path is /login or /register /authenticate, then skip the auth middleware

			fmt.Println("request path: ", r.URL.Path)

			if r.URL.Path == loginRoute || r.URL.Path == registerRoute || r.URL.Path == authenticateRoute || r.URL.Path == logoutRoute {
				h.ServeHTTP(w, r)
				return
			}
			//Unsure if I actually need to do the cookie thing here or if its done at some other part of the middleware

			//Call the auth service to check if the session token is valid
			/* cookie, err := r.Cookie("session_token")
			if err != nil {
				log.Println(err)
				http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
				return
			} */

			//Call the auth service to check if the session token is valid

			/* 	if err != nil {
				log.Println(err)
				http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
				return
			} */

			h.ServeHTTP(w, r)

		})
	}
}

const sessionToken = "session_token"

// Called on the response from the GRPC call - is used to set session token cookies
func withForwardResponseOptionWrapper(logger *zap.Logger) runtime.ServeMuxOption {

	ok := runtime.WithForwardResponseOption(func(ctx context.Context, w http.ResponseWriter, m proto.Message) error {
		//I need to read the cookie from the grpc context and set it as a header in the response
		fmt.Println("Step number 3")
		md, ok := runtime.ServerMetadataFromContext(ctx)
		if !ok {
			log.Println("no metadata")
			return nil
		}

		//Specificly look for the session_token key in the metadata
		token := md.HeaderMD.Get(sessionToken)
		if len(token) == 0 {
			log.Println("no session token")
			return nil
		}

		//perform check if token is set to "logout" and if so, delete the cookie
		if token[0] == "" {
			log.Println("Deleting cookie")
			// Add the session token to the cookie header
			http.SetCookie(w, &http.Cookie{
				Name:   sessionToken,
				Value:  "",
				MaxAge: -1,
				Path:   "/",
			})

			log.Println("session and uuid token deleted")
			return nil
		}

		//Add the session token to the cookie header
		http.SetCookie(w, &http.Cookie{
			Name:    sessionToken,
			Value:   token[0],
			Expires: time.Now().Add(60 * time.Minute),
			Path:    "/",
		})
		log.Println("session token set")

		return nil
	})
	return ok
}

// Called before GRPC call is made
// Function that decides which headers to forward to the gRPC server as metadata
func incomingHeaderMatcherWrapper(logger *zap.Logger) runtime.ServeMuxOption {
	ok := runtime.WithIncomingHeaderMatcher(func(key string) (string, bool) {
		//List of allowed headers that can be forwarded to the gRPC server
		if key == sessionToken {
			fmt.Println("Step number 1")
			log.Default().Println("session_token recieved")
			return key, true
		}

		return runtime.DefaultHeaderMatcher(key)
	})

	return ok
}

// Function that looks at the request and extracts the cookies into metadata
func withMetaDataWrapper(logger *zap.Logger) runtime.ServeMuxOption {
	ok := runtime.WithMetadata(func(ctx context.Context, req *http.Request) metadata.MD {
		fmt.Println("Step number 2")
		cookie, err := req.Cookie(sessionToken)
		if err != nil {
			return nil
		}

		md := metadata.Pairs(sessionToken, cookie.Value)
		log.Default().Println("Cookie turned into metadata")
		return md
	})
	return ok
}
