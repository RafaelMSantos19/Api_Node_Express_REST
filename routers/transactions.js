const { Router } = require("express")
const newTransactionController = require("../controllers/newTransactions")
const getTransactionsController = require("../controllers/getTransactions")
const checkEnvarimentosToFilterMiddleware = require("../middleware/checkEnvarimentosToFilter")
const router = Router()

router
    .post('/newTransaction', 
        
        newTransactionController
    )

    .get('/getTransactions',

        checkEnvarimentosToFilterMiddleware,
        getTransactionsController
    )

module.exports = router