import { EventEmitter } from 'events';

class WebSocketClient extends EventEmitter {
  constructor() {
    super();
    this.ws = null;
    this.jwt = null;
  }

  connect(uri = 'ws://localhost:3000', onDisconnect = () => {}) {
    return new Promise((resolve) => {
      const ws = new WebSocket(uri);
      this.ws = ws;
      ws.onopen = () => resolve();
      ws.onclose = () => onDisconnect();
      ws.onmessage = this.handleMessage.bind(this);
    });
  }

  handleMessage({ data }) {
    const { eventName, payload } = JSON.parse(data);
    this.emit(eventName, payload);
  }

  send(eventName, payload) {
    this.ws.send(JSON.stringify({
      eventName,
      payload: {
        ...payload,
        jwt: this.jwt // not ideal
      }
    }));
  }
}

// We only want one instance so we export a singleton
export default new WebSocketClient();
