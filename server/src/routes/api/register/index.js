
const AuthController = require('@controllers/auth')

module.exports = (app) => {

    app.post('/', async (req, res) =>  {

        let { account, token } = await AuthController.register(req.body)

        return res.status(200).send({jwt: token, account: account})
    })
}