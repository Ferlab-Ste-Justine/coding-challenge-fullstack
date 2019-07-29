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

### Requirements
* Local mysql with user root
* Create database 'wall'

### Run API
* Load project in IntelliJ
* Execute "sbt run"
* API is available at http://localhost:9000
* You could use the following endpoint :
    * GET http://localhost:9000 : To check if the application is running
    * POST /users/authenticate with body {"username":"pumpkins", "password":"test"} to authenticate as member and receive token
    * PUT /users/1/message with body {"message": "New message"} and token in header "Authorization" to update message


