
let config   = require('@lib/config/main')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

let Account = require('@models/account')

class AuthController {

    static async register(body) {

        let display_name = body.username
        let password = body.password

        let hashed_password = await bcrypt.hash(password, 10)

        let account = await Account.create({display_name: display_name, hashed_password: hashed_password})
        
        let token = jwt.sign({ account_id: account.account_id, display_name: display_name }, config.JWT_SECRET)

        return { account: { account_id: account.account_id, display_name: account.display_name}, token }
    }

    static async login(body) {

        let display_name = body.username
        let password = body.password

        let account = await Account.findbyDisplayName(display_name)

        if (!account) {
            throw new Error('Invalid Username or Password')
        }

        let is_valid = await bcrypt.compare(password, account.hashed_password)

        if (!is_valid) {
            throw new Error('Invalid Username or Password')
        }
        
        let token = jwt.sign({ account_id: account.account_id, display_name: display_name }, config.JWT_SECRET)

        return { account: { account_id: account.account_id, display_name: account.display_name}, token }
    }
}

module.exports = AuthController