import {
  WEB_SOCKET_CONNECT,
  WEB_SOCKET_DISCONNECT,
  WEB_SOCKET_SEND,
  WEB_SOCKET_MESSAGE
} from '../constants/websocket';

const webSocketConnect = (url = 'ws://localhost:3000', initCommentsFetch) => {
  return {
    type: WEB_SOCKET_CONNECT,
    payload: { url, initCommentsFetch }
  };
};

const webSocketDisconnect = () => {
  return {
    type: WEB_SOCKET_DISCONNECT
  };
};

const webSocketSendMessage = req => {
  return {
    type: WEB_SOCKET_SEND,
    request: req.request,
    message: req.message
  };
};

const webSocketReceiveMessage = payload => {
  return {
    type: WEB_SOCKET_MESSAGE,
    payload
  };
};

export { webSocketConnect, webSocketDisconnect, webSocketSendMessage, webSocketReceiveMessage };
