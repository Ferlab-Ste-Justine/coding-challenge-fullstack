const config  = require('./config')
const express = require('express')
const app     = express()
const http    = require('http').Server(app)

// Socket IO bug that crashes servers
process.on('uncaughtException', function (err) {
    // handle the error safely
    console.log('uncaughtException:')
    console.log(err)
})

const Server = {
    init() {
        try {
            http.listen(config.PORT, async function () {
                console.log(config.PORT + " OK")

                // Initialize Socket
                require('./socket').init(http)
            })
        } catch (e) {
            log.error(e, 'Error starting up socket server')
        }
    }
}

Server.init()