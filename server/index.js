const http = require('http');
const jwt = require('jsonwebtoken');
const staticHandler = require('serve-handler');
const WebsocketServer = require('./wss');
let { usersPasswords, messageState } = require('./data'); 

// IRL this static server and the websocket server would likely be separated.
const httpServer = http.createServer((req, res) => staticHandler(req, res, { public: __dirname + '/../client/static' }));
const wss = new WebsocketServer({ server: httpServer });

// On a production environment, this would be passed as a secret/env var or even better, a cert file.
const JWT_SECRET = 'super-secret-key';

wss.on('connection', (socket) => {
  
  // First thing we want to do is send the current state of the messages on the server to the newly connected client.
  socket.send('updatedMessage', messageState);

  socket.on('logIn', (data) => {

    const { username, password } = data;

    // Does the user exist?
    if (!usersPasswords[username]) {
      return socket.send('tokenError', { 
        message: `Login Failed. User: "${username}" does not exist.` 
      });
    } 
    
    // Simple password check
    if (usersPasswords[username] !== password) {
      return socket.send('tokenError', { 
        message: 'Login Failed. Incorrect Password.' 
      });
    }

    const token = jwt.sign({
      expiresIn: '1h',
      username
    }, JWT_SECRET);

    // Ideally if using something like socket.io instead of bare `ws` package, i'd want to use the acknowledgement callback here 
    // instead of firing back a totally new event.
    socket.send('token', token);
  });

  socket.on('signUp', (data) => {

    const { username, password } = data;

    // Check to make sure the user does NOT already exist
    if (usersPasswords[username]) {
      return socket.send('tokenError', { 
        message: `Sign up failed. User: "${username}" already exists.` 
      });
    }

    // Add new user/password combo to fake users DB
    usersPasswords = {
      ...usersPasswords,
      [username]: password
    };

    // create blank slate for user message in fake messages db
    messageState = {
      ...messageState,
      [username]: ''
    };

    // Create a token for the new user
    const token = jwt.sign({
      expiresIn: '50000s',
      exp: Math.floor(Date.now() / 1000) + 50000,
      username
    }, JWT_SECRET);

    // Send auth token to new user
    socket.send('token', token);

    // Broadcast the new/updated messages state to ALL connected sockets.
    wss.broadcast('updatedMessage', messageState);
  });

  socket.on('updateMessage', (data) => {
    
    // Ensure user updating their message has a valid JWT token
    try {
      const decoded = jwt.verify(data.jwt, JWT_SECRET);
      const username = decoded.username;

      // Peel off the username here, update the global messageState, then send the whole thing back.
      messageState = {
        ...messageState,
        [username]: data.text
      };      
      
      // Broadcast the new/updated messages state to ALL connected sockets.
      wss.broadcast('updatedMessage', messageState);
      
    } catch (err) {
      socket.send('error', {
        message: 'Not authorized. Please log in or sign up.'
      })
    }

  });
});

httpServer.listen(3000, () => {
  console.log('listening on port 3000');
});
