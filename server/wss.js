const WebSocket = require('ws');
const { EventEmitter } = require('events');

// Little helper module to create an API that closer resembles socket.io, but using the `ws` library in node.js
class WebSocketServer extends EventEmitter {

  constructor(opts) {
    super(opts);
    this.opts = opts;
    this.sockets = [];
    this.wss = new WebSocket.Server(opts);
    this.wss.on('connection', this.handleConnection.bind(this));
  }

  handleConnection(rawSocket) {

    const upgradedSocket = new EventEmitter;

    // Everytime we have a message from the raw socket, parse it and pass
    // the event to the upgraded socket that is exposed to the user.
    rawSocket.on('message', (rawData) => {
      const { eventName, payload } = JSON.parse(rawData);
      upgradedSocket.emit(eventName, payload);
    });

    // Attach a method to the socket instance so that you can call
    // .send(eventName, payload) with it. It will stringify and pass
    // that event back up the wire to the raw socket.
    upgradedSocket.send = (eventName, payload) => {
      rawSocket.send(JSON.stringify({
        eventName,
        payload
      }));
    };

    this.sockets.push(upgradedSocket);
    
    this.emit('connection', upgradedSocket);
  }

  broadcast(eventName, payload) {
    this.sockets.forEach(socket => socket.send(eventName, payload));
  }
}

module.exports = WebSocketServer;
