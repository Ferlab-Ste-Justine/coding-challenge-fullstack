const logged_in = require('@middleware/logged_in')

module.exports = (app) => {

    app.get('/', logged_in, async (req, res) => {
        let account_info = req.user

        return res.status(200).send({account: account_info})
    })

}