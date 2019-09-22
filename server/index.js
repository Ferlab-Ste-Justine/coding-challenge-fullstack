const http = require('http');
const jwt = require('jsonwebtoken');
const staticHandler = require('serve-handler');
const WebsocketServer = require('./wss');
let { usersPasswords, messageState } = require('./data'); 

// IRL this static server and the websocket server would be separated.
const httpServer = http.createServer((req, res) => staticHandler(req, res, { public: __dirname + '/../client/static' }));
const wss = new WebsocketServer({ server: httpServer });

// On a production environment, this would be passed as a secret/env var or even better, a cert file.
const JWT_SECRET = 'super-secret-key';

wss.on('connection', (socket) => {
  
  // First thing we want to do is send the current state of the messages on the server to the newly connected client.
  socket.send('updatedMessage', messageState);

  // Login Event Handler
  // Here we take a username and password and we return a JWT token that the client will append 
  // to all subsequent requests/websocket events so that we can ensure who is writing the message.
  socket.on('logIn', (data) => {

    const { username, password } = data;

    // super simple password check.
    if (!usersPasswords[username] || usersPasswords[username] !== password) {
      return socket.send('tokenError', { message: 'Login Failed' });
    }

    const token = jwt.sign({
      expiresIn: '1h',
      username
    }, JWT_SECRET);

    // Ideally if using something like socket.io instead of bare `ws` package, i'd want to use the aknowledgement callback here 
    // instead of firing of a totally new event.
    socket.send('token', token);
  });

  socket.on('signUp', (data) => {

    const { username, password } = data;

    if (usersPasswords[username]) {
      return socket.send('tokenError', { message: 'Sign up failed, user already exists.' });
    }

    // Add new user/password combo to fake DB
    usersPasswords = {
      ...usersPasswords,
      [username]: password
    };

    // create blank slate for user message in fake db
    messageState = {
      ...messageState,
      [username]: ''
    };

    // Create a token for them
    const token = jwt.sign({
      expiresIn: '50000s',
      exp: Math.floor(Date.now() / 1000) + 50000,
      username
    }, JWT_SECRET);

    socket.send('token', token);

    // Broadcast the new/updated messages state to ALL connected sockets.
    wss.broadcast('updatedMessage', messageState);
  });

  socket.on('updateMessage', (data) => {
    
    // Ensure user updating a message has a valid JWT token
    try {
      const decoded = jwt.verify(data.jwt, JWT_SECRET);
      const username = decoded.username;

      // Peel off the username here, update the messageState, then send the whole thing back.
      messageState = {
        ...messageState,
        [username]: data.text
      };      
      
      // Broadcast the new/updated messages state to ALL connected sockets.
      wss.broadcast('updatedMessage', messageState);
    }

    catch (err) {
      socket.send('error', 'Not authorized. Please log in or sign up.')
    }

  });
});

httpServer.listen(3000, () => {
  console.log('listening on port 3000');
});
