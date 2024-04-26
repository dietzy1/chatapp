package websocket

import (
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"go.uber.org/zap"
)

//The bug could be related to when the websocket crashes unexpectedly and everything is cleaned up incorrectly
//for example some state change could be sent on the channel after the client is removed from the manager
//Maybe the solution is to make sure that the activity channel also is cleaned up like the rest of them

//There is currently a database
//The issue might be that I dont currently restrict myself to one concurrent reader and writer per connection
//So I need to look into if the client also is sending messages to the server
//And if that is the case then I need to create more channels to ensure that only the connection writer is allowed to write to the connection

// PubSub is an interface for a Redis Pub/Sub client.

type manager struct {
	logger *zap.Logger

	config *Config

	upgrader *websocket.Upgrader
	//Redis pubsub service
	broker MessageBroker

	//Message service client
	messageService MessageService

	// Websocket clients key is userID
	clients map[string]*client

	// Clients connected to a chatroom - key is chatroomID
	chatroomClients map[string][]string

	mu sync.RWMutex
}

type ids struct {
	chatroomId string
	channelId  string
	userId     string
}

type Config struct {
	Addr   string
	Logger *zap.Logger
}

func NewManager(c *Config, broker MessageBroker, messageService MessageService) *manager {

	//Create new manager
	m := &manager{
		logger:          c.Logger,
		config:          c,
		clients:         make(map[string]*client),
		chatroomClients: make(map[string][]string),
		//mutexes
		mu: sync.RWMutex{},

		//upgrader
		upgrader: &websocket.Upgrader{
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		},
		broker:         broker,
		messageService: messageService,
	}

	return m
}

func (m *manager) ListenAndServe() error {

	srv := http.Server{
		Addr:              m.config.Addr,
		ReadTimeout:       5 * time.Second,
		ReadHeaderTimeout: 5 * time.Second,
		WriteTimeout:      10 * time.Second,
		IdleTimeout:       120 * time.Second,
	}

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		m.upgradeHandler(w, r)
	})

	m.logger.Info("Websocket server started on port " + m.config.Addr)

	if err := srv.ListenAndServe(); err != nil {
		m.logger.Error("Failed to start websocket server", zap.Error(err))
		return err
	}
	return nil

}

func (m *manager) Shutdown() error {
	wg := &sync.WaitGroup{}
	m.mu.Lock()
	defer m.mu.Unlock()
	for _, client := range m.clients {
		wg.Add(1)
		go client.conn.Close(wg)
	}
	wg.Wait()
	return nil
}

func (m *manager) upgradeHandler(w http.ResponseWriter, r *http.Request) {
	ids := ids{
		chatroomId: r.URL.Query().Get("chatroomId"),
		channelId:  r.URL.Query().Get("channelId"),
		userId:     r.URL.Query().Get("userId"),
	}
	if ids.chatroomId == "" || ids.channelId == "" || ids.userId == "" {
		if ids.chatroomId == "" {
			m.logger.Info("Invalid query parameter: missing chatroomId")
		}
		if ids.channelId == "" {
			m.logger.Info("Invalid query parameter: missing channelId")
		}
		if ids.userId == "" {
			m.logger.Info("Invalid query parameter: missing userId")
		}
		return
	}

	conn, err := m.upgrader.Upgrade(w, r, nil)
	if err != nil {
		m.logger.Error("Failed to upgrade connection", zap.Error(err))
		return
	}

	ws := newConnection(
		conn,
		m.logger,
	)

	//Potentially add the MessageSerivce dont know yet
	client := newClient(ids, ws, m.logger, m.broker, m.messageService)

	m.addClient(client)
	defer m.removeClient(client)

	client.run(m)
}

//The issue is that I am trying to send on a closed channel

// Returns a slice of clients that are connected to the chatroom
func (m *manager) addClient(c *client) {
	m.logger.Info("Adding client to manager")
	m.mu.Lock()
	defer m.mu.Unlock()

	m.clients[c.ids.userId] = c

	// Check if the user ID already exists in the slice
	for _, id := range m.chatroomClients[c.ids.chatroomId] {
		if id == c.ids.userId {
			// If the user ID already exists, do not append
			return
		}
	}

	// Append the user ID to the slice
	m.chatroomClients[c.ids.chatroomId] = append(m.chatroomClients[c.ids.chatroomId], c.ids.userId)

}

// Returns a slice of clients that are connected to the chatroom
func (m *manager) removeClient(c *client) {
	m.logger.Info("Removing client from manager")
	m.mu.Lock()
	defer m.mu.Unlock()

	delete(m.clients, c.ids.userId)

	m.chatroomClients[c.ids.chatroomId] = remove(m.chatroomClients[c.ids.chatroomId], c.ids.userId)
}

type activeUsersCallback interface {
	getChatroomClients(chatroomId string) []string
}

func (m *manager) getChatroomClients(chatroomId string) []string {
	m.logger.Info("Callback function called")
	//Locate all clients in the chatroom
	m.mu.RLock()
	defer m.mu.RUnlock()

	chatroomClients := m.chatroomClients[chatroomId]
	m.logger.Info("Chatroom clients", zap.Any("clients", chatroomClients))

	return chatroomClients
}
