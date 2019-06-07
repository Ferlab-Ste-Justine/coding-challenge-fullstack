const dotenv = require("dotenv")

// Load .env first to optimize modules for production
dotenv.config()

const config = {
    PORT     : process.env.PORT,

    JWT_SECRET     : process.env.JWT_SECRET,

    SOCKET_ORIGINS: process.env.ORIGINS,
    
    ACTIONS: {
        UPDATE_MESSAGE: "UPDATE_MESSAGE",
        INITIAL_MESSAGES: "INITIAL_MESSAGES"
    },

    REDIS : {
        PORT     : process.env.REDIS_PORT,
        URL      : process.env.REDIS_HOST,
        PASSWORD : process.env.REDIS_PASSWORD
    }
}

module.exports = {
    ...config
}
