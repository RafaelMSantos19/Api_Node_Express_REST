const transaction = require("./transactions")

module.exports = app => {
    app.use(
        transaction
    )
}