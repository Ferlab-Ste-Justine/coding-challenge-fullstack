const config         = require('./config')
const redisClient    = require('redis').createClient
const Promise        = require('bluebird')

Promise.promisifyAll(redisClient.prototype)

let pub = redisClient(config.REDIS.PORT, config.REDIS.URL, {no_ready_check: true, auth_pass: config.REDIS.PASSWORD})
let sub = redisClient(config.REDIS.PORT, config.REDIS.URL, {no_ready_check: true, detect_buffers: true, auth_pass: config.REDIS.PASSWORD})

pub.on('error', function(e) {
    console.error(e, "Could not connect Redis client.")
})

pub.on('connect', function() {
    console.log("Redis Pub OK")
})

sub.on('error', function(e){
    console.error(e, "-- Error in redis subscribe client --")
})

sub.on('connect', function(){

    const socket = require('./socket')

    sub.subscribe(config.ACTIONS.UPDATE_MESSAGE)
    
    sub.on('message', function (channel, message){
        
        try {
            
            console.log('Got redis message.')
            console.log({ channel, message })

            let action_payload = JSON.parse(message)

            socket.broadcast({
                type: channel,
                payload: action_payload
            })

        } catch (e) {
            console.error(e)
        }

    })
    
    console.log('Redis Sub OK')
})


module.exports = pub