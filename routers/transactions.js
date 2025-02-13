const { Router } = require("express")
const newTransactionController = require("../controllers/newTransactions")
const getTransactionsController = require("../controllers/getTransactions")
const router = Router()

router
    .post('/newTransaction', 
        
        newTransactionController
    )

    .get('/getTransactions',

        getTransactionsController
    )

module.exports = router