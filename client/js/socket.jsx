// Import this and use as configs
import io from 'socket.io-client';
import Config from './config.jsx'
import { getJWT } from './localStorage.jsx';

let socket = null

export function updateSocket() {
    let token = getJWT()
    socket = io(Config.REACT_SOCKET_URL, { transports: ['websocket'], 'query': 'token=' + token });
}

updateSocket()

export default socket