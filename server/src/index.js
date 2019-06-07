'use strict'

// Prevent ../ hell.
require('module-alias/register')

require('express-async-errors')

const config = require('@lib/config/main')

const express        = require('express')
const helmet         = require('helmet')
const bodyParser     = require('body-parser')

const router       = require('@lib/router')

const app = express()

const Server = {
    async init() {
        console.log(`Starting web server`)

        // Security
        app.use(helmet())

        // Body parsing.
        app.use(bodyParser.urlencoded({ extended: true, limit: "100kb" }))
        app.use(bodyParser.json({ limit: "100kb" }))

        // Serving static content.
        app.use(express.static(config.PUBLIC_PATH))

        app.use('/', router)

        app.listen(config.PORT, () => console.log(`${config.PORT} OK`))
    }
}

process.on('unhandledRejection', (err) => {
    console.error(err)

    setTimeout(() => {
        process.exit(1)
    }, 500)
})

process.on('uncaughtException', (err) => {
    console.error(err)

    setTimeout(() => {
        process.exit(1)
    }, 500)
})

Server.init()
