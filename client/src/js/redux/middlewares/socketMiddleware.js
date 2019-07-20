import { ALL_COMMENTS, FETCH_ALL_COMMENTS } from '../../appConstants';
import { webSocketSendMessage } from '../actions/websocket';
import { ADD_ALL_COMMENTS } from '../constants/comments';
import { WEB_SOCKET_CONNECT, WEB_SOCKET_DISCONNECT, WEB_SOCKET_SEND } from '../constants/websocket';

let websocket;

const socketMiddleware = ({ dispatch }) => next => action => {
  switch (action.type) {
    case WEB_SOCKET_CONNECT: {
      // eslint-disable-next-line no-undef
      websocket = new WebSocket(action.payload.url);

      const isInitialLoad = action.payload.initCommentsFetch;

      websocket.onopen = () =>
        isInitialLoad
          ? dispatch(webSocketSendMessage({ request: FETCH_ALL_COMMENTS, message: '' }))
          : null;

      websocket.onclose = () => {};

      websocket.onmessage = event => {
        const data = JSON.parse(event.data);
        if (data && Array.isArray(data[ALL_COMMENTS])) {
          dispatch({ type: ADD_ALL_COMMENTS, payload: data[ALL_COMMENTS] });
        }
      };
      break;
    }

    case WEB_SOCKET_SEND:
      websocket.send(
        JSON.stringify({
          request: action.request,
          payload: action.message
        })
      );
      break;
    case WEB_SOCKET_DISCONNECT:
      websocket.close();
      break;

    default:
      break;
  }

  return next(action);
};

export default socketMiddleware;
