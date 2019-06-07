const express = require('express')
const finder  = require('fs-finder')
const path    = require('path')

const router = express.Router()

let routes = finder.from(path.join(__dirname, '../routes')).findFiles('*.js').map(f => {
    return path.relative(path.join(__dirname, '../routes'), f)
})

routes.forEach(route => {
    let temp_router = express.Router()
    let route_path  = route.slice(0, -3).replace(/\\/g, '/')

    if (route_path.slice(-5) === 'index') {
        route_path = route_path.slice(0, -5)
    }

    let route_fn = require(path.join(__dirname, '../routes', route))

    route_fn(temp_router)

    router.use('/' + route_path, temp_router)
})

module.exports = router