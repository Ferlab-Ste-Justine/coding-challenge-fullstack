
const AuthController = require('@controllers/auth')

module.exports = (app) => {

    app.post('/', async (req, res) =>  {

        let { account, token } = await AuthController.login(req.body)

        return res.status(200).send({jwt: token, account: account})
    })
}