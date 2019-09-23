# Coding Challenge
Fork this repository, and submit your pull request providing documentation to the product.

### Project Guidelines
* Easy to use single-page application
* Members can dynamically view and change the Wall
* Guests can only view the Wall being changed dynamically

### Front-end Technical Guidelines
* React.js and Redux
* Responsive (mobile and desktop; tablet is not required)
* HTML5 WebSockets API

### Back-end Technical Guidelines
* Node.js or Java
* Auth using JSON Web Token

### Product Specification
* See wireframe.png


# Documentation

### requirements
- `yarn@1.17.3`
- `node@10.16.3`

### install project dependencies
```
yarn
```

### build static files
```
yarn build
```

### start the node server
```
yarn start
```

The node server handles both static files and the WebSocket connections.
Visit: `http://localhost:3000` in your browser to sign up and add your own message of the day!


### development
If you want to develop with webpack and have some minor hot-reloading do the following:
```
yarn start:dev
```

This will use `webpack-dev-server` to serve up your static assets.
You'll still need to fire up the node server with
```
yarn start
```

to handle the websocket connections.


