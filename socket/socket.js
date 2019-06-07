const socketioJwt   = require("socketio-jwt")
const redis = require("./redis")

const config = require('./config')

const socket = {

    init : function (http) {

        this.io = require('socket.io')(http)
        this.io.set('transports', ['websocket'])
        this.io.set('origins', config.SOCKET_ORIGINS)

        //Auth
        this.io.use(socketioJwt.authorize({
            secret: config.JWT_SECRET,
            handshake: true,
            fail: (err, data, accept) => {
                accept()
            }
        }))

        this.io.on('connection', async socket => {

            socket.on('disconnect', () => {})

            let token = socket.decoded_token

            redis.hgetall('messages', (err, data) => {
                if (data) {
                    messages = Object.keys(data).map(display_name => { return {display_name: display_name, info: data[display_name]}})
                    socket.emit('action', { type: config.ACTIONS.INITIAL_MESSAGES, payload: { messages: messages }})
                }
            })

            if (token) {
                console.log("Connected", token)

                let display_name = token.display_name

                socket.on('action', function(action){
                    let actionType = action.type
                    if (actionType === config.ACTIONS.UPDATE_MESSAGE) {
                        let actionPayload = action.payload
                        
                        //TODO some validation
                        let validatedPayload = {
                            display_name: display_name,
                            message: actionPayload.message
                        }

                        redis.hset('messages', display_name, actionPayload.message)
                        redis.publish(actionType, JSON.stringify(validatedPayload))
                    }
                })

            }
        })

    },

    broadcast : function (data) {
        this.io.emit("action", data)
    }
}

module.exports = socket
