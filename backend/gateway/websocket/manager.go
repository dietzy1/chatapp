package websocket

import (
	"log"
	"net/http"
	"os"
	"sync"

	"github.com/dietzy1/chatapp/pkg/clients"
	messageclientv1 "github.com/dietzy1/chatapp/services/message/proto/message/v1"
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

type manager struct {
	//Key is userID
	clients map[string]*client

	//Key is chatroomID
	active map[string][]string

	upgrader websocket.Upgrader
	mu       sync.RWMutex

	logger *zap.Logger

	//Redis pubsub service
	broker Broker

	//Message service client
	messageClient messageclientv1.MessageServiceClient
}

func newManager(broker Broker, messageClient messageclientv1.MessageServiceClient, l *zap.Logger) *manager {
	return &manager{
		clients:       make(map[string]*client),
		active:        make(map[string][]string),
		mu:            sync.RWMutex{},
		broker:        broker,
		messageClient: messageClient,
		logger:        l,

		upgrader: websocket.Upgrader{
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		},
	}
}

type id struct {
	chatroom string
	channel  string
	user     string
}

func (m *manager) upgradeHandler(w http.ResponseWriter, r *http.Request) {

	m.logger.Info("Websocket connection established")
	id := id{
		chatroom: r.URL.Query().Get("chatroom"),
		channel:  r.URL.Query().Get("channel"),
		user:     r.URL.Query().Get("user"),
	}
	if id.chatroom == "" || id.channel == "" || id.user == "" {
		m.logger.Error("Missing chatroom, user or channel")
		return
	}

	conn, err := m.upgrader.Upgrade(w, r, nil)
	if err != nil {
		m.logger.Error("Failed to upgrade connection", zap.Error(err))
		return
	}

	ws := newConnection(&connOptions{conn: conn, logger: m.logger})

	client := newClient(&clientOptions{
		conn:          ws,
		id:            id,
		broker:        m.broker,
		messageClient: m.messageClient,
		logger:        m.logger,
	},
	)

	m.addClient(client, id)
	//client.updateClientActivity(id.chatroom, m.active[id.chatroom])
	defer client.updateClientActivity(id.chatroom, m.active[id.chatroom])
	defer m.removeClient(client, id)

	client.run(id.chatroom, m.active[id.chatroom])

}

//The issue is that I am trying to send on a closed channel

func (m *manager) addClient(c *client, id id) {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.logger.Info("Adding client to manager")

	m.clients[id.user] = c

	//Perform check to see if id.user is already contained in the string array
	ok := m.active[id.chatroom]
	//Check if user is already in the active slice
	for _, v := range ok {
		if v == id.user {

			log.Println("THIS IS NOT SUPPOSED TO HAPPEN FIND OUT WHAT THE UNDERLYING ISSUE IS 😡😡😡😡😡  Active Users: ", m.active)
			return
		}
	}

	m.active[id.chatroom] = append(m.active[id.chatroom], id.user)

	log.Println("Active Users: ", m.active)
}

func (m *manager) removeClient(c *client, id id) {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.logger.Info("Removing client from manager")

	delete(m.clients, id.user)

	ok := m.active[id.chatroom]

	//Remove element from slice that contains user id
	//TODO: veryfy that this logic works
	for i, v := range ok {
		if v == id.user {
			m.logger.Warn("Removing user from active users", zap.String("user", id.user))
			m.active[id.chatroom] = append(ok[:i], ok[i+1:]...)
		}
	}

	//remove element from slice that contains user id

	log.Println("Removing users, active users left: ", m.active)

}

func Start(logger *zap.Logger) {

	broker := newBroker(logger)

	//New messageService
	messageClient := clients.NewMessageClient()

	//manager should accept the broker interface
	m := newManager(broker, *messageClient, logger)

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		logger.Info("Websocket connection request received")
		m.upgradeHandler(w, r)
	})

	err := http.ListenAndServe(os.Getenv("WS"), nil)
	if err != nil {
		logger.Fatal("Failed to start websocket server", zap.Error(err))
	}
	logger.Info("Websocket server started on port " + os.Getenv("WS"))
}
