'use strict'

const path = require('path')
const dotenv = require("dotenv")

// Load .env first to optimize modules for production
dotenv.config()

// Build config from env
const config = {
    PORT       : process.env.PORT,

    ORIGIN : process.env.ORIGIN,

    JWT_SECRET: process.env.JWT_SECRET,

    PG_CONFIG : {
        client     : 'pg',
        connection : {
            host              : process.env.POSTGRES_HOST,
            user              : process.env.POSTGRES_USER,
            password          : process.env.POSTGRES_PASSWORD,
            database          : process.env.POSTGRES_DATABASE,
            port              : process.env.POSTGRES_PORT,
            idleTimeoutMillis : 5000
        },
        pool                     : { min : 0, max : 50 },
        acquireConnectionTimeout : 30000
    },

    PUBLIC_PATH : path.join(__dirname, '../../../', process.env.PUBLIC_PATH)
}

module.exports = config
