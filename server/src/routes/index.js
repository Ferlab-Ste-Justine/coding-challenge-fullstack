'use strict'

const path   = require('path')
const config = require('@lib/config/main')

module.exports = (app) => {

    app.get('*', (req, res) => {
        res.sendFile(path.join(config.PUBLIC_PATH, 'index.html'))
    })

}