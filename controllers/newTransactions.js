const pool = require('../connections/db')

async function newTransaction(req, res) {

    try{

        const { valor, status, metodo_pagamento} = req.body


        console.log(valor)
        console.log(status)
        console.log(metodo_pagamento)

        const newTransaction = await pool.query(
            `INSERT INTO transactions (valor, status, metodo_pagamento) VALUES (${valor}, '${status}', '${metodo_pagamento}')`
        )

        res.json(newTransaction.rows[0])

    }catch (erro){
        console.error("Um erro ocorreu:")
        console.error(erro.mensagem)
        res.status(500).send('Erro a o Registra Transação');
    }


}

module.exports = newTransaction