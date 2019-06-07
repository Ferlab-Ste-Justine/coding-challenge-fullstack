'use strict'

const knex = require("knex")

const config = require('@lib/config/main')

const sql = knex(config.PG_CONFIG)

sql.testConnection = async () => {
    try {
        await sql.raw("select 1")

        console.log('PostgreSQL OK')

        sql.on('query', (data) => {
            const params  = data.bindings
            const command = data.sql
            let i = 0

            const q = command.replace(/\?/g, () => params[i++])

            console.log(q)
        })
    } catch (e) {
        console.error(e, 'Error connecting to db.')
        throw e
    }
}

module.exports = sql