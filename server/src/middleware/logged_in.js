const config    = require('@lib/config/main')

const bluebird    = require('bluebird')
const express_jwt = require('express-jwt')
const express_jwt_async = bluebird.promisify(express_jwt({secret: config.JWT_SECRET}))

module.exports = async (req, res, next) => {
    await express_jwt_async(req, res)
    return next()
 }