import { updateMessages } from './messages';

export const RESET_USER = 'RESET_USER';
export function resetUser() {
  return (dispatch, __, socket) => {
    socket.jwt = null;
    dispatch({ type: RESET_USER });
  }
}

export const UPDATE_USER = 'UPDATE_USER';
export function updateUser(update) {
  return {
    type: UPDATE_USER,
    update
  };
}

// This action connects to the websocket server, but does NOT authenticate.
export function connectUser() {
  return async (dispatch, _, socket) => {
    try {
      
      // Create thunk that will update redux state when users socket becomes disconnected.
      const onDisconnect = () => dispatch(updateUser({ connected: false }));

      // All users should get message updates as a firehose once connected to the wss
      socket.on('currentMessageState', (messages) => {
        dispatch(updateMessages(messages))
      });

      socket.on('error', (error) => {
        console.error(error);
        // TODO: Display this in UI somewhere.
      });

      await socket.connect('ws://localhost:3000', onDisconnect);

      // At this point we are connected, but not authenticated or associated with a user account.
      // The user will need to either log in or sign up to authenticate.
      dispatch(updateUser({ connected: true }));
    
      return;

    } catch (err) {
      throw new Error('Something went wrong connecting to websocket server', err.message);
    }
  };
}

// This action fires off an event to obtain a token from the server.
// Once the token is received, we just assign it to the socket object. Can probably improve this
export function logIn(username, password) {
  return (dispatch, _, socket) => {
    return new Promise((resolve, reject) => {

      socket.on('token', (token) => {
        dispatch(updateUser({ username, authenticated: true }));

        // in an ideal world I'd put this in localStorage or something similar.
        socket.jwt = token;

        resolve(token);
      });
    
      socket.on('tokenError', (err) => reject(err));
      socket.send('logIn', { username, password });
    })
  };
}

export function signUp(username, password) {
  return (dispatch, _, socket) => {
    return new Promise((resolve, reject) => {

      // Set up a handler to listen for token event that will be fired if auth succeeds
      socket.on('token', (token) => {
        dispatch(updateUser({ username, authenticated: true }));
        socket.jwt = token;
        resolve(token);
      });
      
      socket.on('tokenError', (err) => reject(err));
      socket.send('signUp', { username, password });
    })
  };
}
