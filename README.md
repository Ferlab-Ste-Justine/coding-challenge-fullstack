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

############################

* I was really unsure of how in detail I was supposed to go and I only had a a few of hours to work on this
* Please reach out if you think I should provide more documentation or if I shoudl clean up the code (like add validation)

* If you want to run it you will need PostgreSQL and Redis running on your computer. You should create a .env file with the same fields as the .env.example and put in your information

# One way to get started

### Create your database and user
* createdb coding_test
* createuser coding_test_user
* psql coding_test -c 'ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO coding_test_user'

### Initialize DATABASE
RUN => sql/create.sql

### Socket Server
* Socket server uses socket.io and redis to transport messages to all clients
* Redis is used in case of multiple servers are needed in the future
* The current state of the wall is stored in redis so that a user can get it when they initially connect their socket

### Web Server
* Mainly used for authentication using JWT
* Users stored in PostgreSQL

### Client
* React App using Redux
* Split up in to Actions, Reducers and Components

