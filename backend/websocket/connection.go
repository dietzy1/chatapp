package websocket

import (
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"go.uber.org/zap"
)

const (
	// wait time for message sends to succeed.
	writeTimeout = 10 * time.Second
	// close connections where we haven't received a ping in `idleTimeout`.
	idleTimeout = 70 * time.Second
	// How often we ping clients.
	pingPeriod = 30 * time.Second
	// Max size of inbound message, in bytes.
	maxInboundMessageSize = 40 * 1024
	// Max number of messages queued in send buffer.
	sendBufferSize = 200
	// Max number of messages queued in receive buffer.
	recieveBufferSize = 200
)

type connection struct {
	conn           *websocket.Conn
	logger         *zap.Logger
	connectedAt    time.Time
	lastPongAt     time.Time
	cleanupOnce    *sync.Once
	sendChannel    chan []byte
	receiveChannel chan []byte
}

func newConnection(conn *websocket.Conn, logger *zap.Logger) *connection {
	now := time.Now()
	return &connection{
		conn:           conn,
		logger:         logger,
		connectedAt:    now,
		lastPongAt:     now,
		cleanupOnce:    &sync.Once{},
		sendChannel:    make(chan []byte, sendBufferSize),
		receiveChannel: make(chan []byte, recieveBufferSize),
	}
}

func (c *connection) run() {
	go c.readPump()
	go c.writePump()
}

func (c *connection) cleanup() {

	c.cleanupOnce.Do(func() {

		close(c.receiveChannel)
		close(c.sendChannel)

		err := c.conn.Close()
		if err != nil {
			c.logger.Error("failed to close connection", zap.Error(err))
		}

		c.logger.Info("cleaning up connection")
	})
}

func (c *connection) writePump() {
	c.logger.Debug("starting write pump")
	timer := time.NewTicker(pingPeriod)
	defer func() {
		c.logger.Debug("write pump stopped")
		timer.Stop()
		c.cleanup()

	}()

	for {
		select {
		//Handle ping messages
		case <-timer.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeTimeout))
			if err := c.conn.WriteControl(websocket.PingMessage, nil, time.Now().Add(writeTimeout)); err != nil {
				c.logger.Error("Failed to write ping message", zap.Error(err))
				return
			}

		//Handle messages to send
		case msg, ok := <-c.sendChannel:
			if !ok {
				c.logger.Info("send channel closed")
				return
			}

			if err := c.conn.SetWriteDeadline(time.Now().Add(writeTimeout)); err != nil {
				c.logger.Error("failed to set write deadline", zap.Error(err))
				return
			}

			//Check if the connection is still open
			if c.conn == nil {
				c.logger.Info("connection is closed")
				return
			}

			if err := c.conn.WriteMessage(websocket.TextMessage, msg); err != nil {
				c.logger.Info("failed to write message", zap.Error(err))
				return
			}
		}

	}

}

func (c *connection) readPump() {
	c.logger.Debug("starting read pump")
	defer func() {
		c.logger.Debug("read pump stopped")
		c.cleanup()
	}()

	c.conn.SetReadLimit(maxInboundMessageSize)
	if err := c.conn.SetReadDeadline(time.Now().Add(idleTimeout)); err != nil {
		c.logger.Error("failed to set read deadline", zap.Error(err))
	}

	c.conn.SetPongHandler(func(s string) error {
		c.lastPongAt = time.Now()
		if err := c.conn.SetReadDeadline(time.Now().Add(idleTimeout)); err != nil {
			c.logger.Error("failed to set read deadline", zap.Error(err))
			c.cleanup()
		}
		return nil
	})

	for {

		//Read from the connection
		_, msg, err := c.conn.ReadMessage()
		if err != nil {
			c.logger.Info("failed to read message", zap.Error(err))
			return
		}

		c.logger.Info("received message", zap.String("data", string(msg)))

		select {
		case c.receiveChannel <- msg:

		default:
			c.logger.Warn("receive channel full")
			go c.cleanup()
			return

		}
	}

}

// Close closes the connection gracefully. It waits for all goroutines to finish.
func (c *connection) Close(wg *sync.WaitGroup) {
	defer wg.Done()
	//c.writeClose()
	c.cleanup()
}
