import { WEB_SOCKET_MESSAGE } from '../constants/websocket';

const webSocketReducer = (state = {}, action) => {
  switch (action.type) {
    case WEB_SOCKET_MESSAGE:
      return state;
    default:
      return state;
  }
};

export default webSocketReducer;
