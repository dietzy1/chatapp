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
	loginRoute        = "/v1/auth/login"
	registerRoute     = "v1/auth/register"
	authenticateRoute = "/v1/auth"
	logoutRoute       = "/v1/auth/logout"
)

func wrapperAuthMiddleware(logger *zap.Logger) func(http.Handler) http.Handler {
	return func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			//if the request path is /login or /register /authenticate, then skip the auth middleware

			fmt.Println("request path: ", r.URL.Path)

			if r.URL.Path == loginRoute || r.URL.Path == registerRoute || r.URL.Path == authenticateRoute || r.URL.Path == logoutRoute {
				h.ServeHTTP(w, r)
				logger.Info("skipping auth middleware")
				return
			}
			logger.Info("running auth middleware")
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

const sessionTokenName = "session_token"

// Called on the response from the GRPC call - is used to set session token cookies
func withForwardResponseOptionWrapper(logger *zap.Logger) runtime.ServeMuxOption {

	ok := runtime.WithForwardResponseOption(func(ctx context.Context, w http.ResponseWriter, m proto.Message) error {
		md, ok := runtime.ServerMetadataFromContext(ctx)
		if !ok {
			log.Println("no metadata")
			return nil
		}

		//Specificly look for the session_token key in the metadata
		token := md.HeaderMD.Get(sessionTokenName)

		logger.Info("session token", zap.Any("token", token))

		if len(token) == 0 {
			log.Println("no session token")
			return nil
		}

		//perform check if token is set to "logout" and if so, delete the cookie
		/* 	if token[0] == "" {
			log.Println("Deleting cookie")
			// Add the session token to the cookie header
			http.SetCookie(w, &http.Cookie{
				Name:   sessionTokenName,
				Value:  "",
				MaxAge: -1,
				Path:   "/",
			})

			log.Println("session and uuid token deleted")
			return nil
		} */

		//Add the session token to the cookie header
		http.SetCookie(w, &http.Cookie{
			Name:    sessionTokenName,
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
		if key == "Cookie" {
			logger.Debug("forwarding header", zap.String("key", key))
			return key, true
		}

		return runtime.DefaultHeaderMatcher(key)
	})

	return ok
}

// Function that looks at the request and extracts the cookies into metadata
func withMetaDataWrapper(logger *zap.Logger) runtime.ServeMuxOption {
	ok := runtime.WithMetadata(func(ctx context.Context, req *http.Request) metadata.MD {
		cookie, err := req.Cookie(sessionTokenName)
		if err != nil {
			logger.Debug("no session token found in cookies")
			return nil
		}

		md := metadata.Pairs(sessionTokenName, cookie.Value)

		logger.Debug(sessionTokenName, zap.Any("value", cookie.Value))
		return md
	})
	return ok
}
