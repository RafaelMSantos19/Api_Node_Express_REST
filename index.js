require('dotenv').config();

const pool = require('./connections/db')
const express = require('express')
const app = express()

app.use(express.json());



function appendWhere(headers){

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

    console.log(headers)
    
    whereArray= [] 

    const { id, valor, status, metodo_pagamento} = headers

    if(id !=null){
        whereArray.push(`id = ${id}`)
    }
    if(valor != null && valor != '' && valor != undefined){
        whereArray.push(`valor = ${valor}`)
    }
    if(status != null){
        whereArray.push(`status = '${status}'`)
    }
    if(metodo_pagamento != null && metodo_pagamento != '' && metodo_pagamento != undefined){
        whereArray.push(`metodo_pagamento = '${metodo_pagamento}'`)
    }
            

    if(whereArray.length == 0){

        return null
    }else{

        where = "where "+whereArray.join(" AND ")


        return where
    }
    
}



app.get('/getTransactions', async (req, res) => {

    try{

        where = appendWhere(req.headers)

        console.log(where)



        if(where != null){

            StringQuery = `select * from transactions ${where}`

        }else{     
  
            StringQuery = "select * from transactions"
        }


        const transactions = await pool.query(StringQuery)
        res.send(transactions.rows);

    }catch(erro){
        console.error("Um erro ocorreu:")
        console.error(erro.mensagem)
        res.status(500).send('Erro a o Exibir Transação');
    }

});


app.post('/newTransaction', async (req, res) => {

    try{

        const { valor, status, metodo_pagamento} = req.body

        const newTransaction = await pool.query(
            `INSERT INTO transactions (valor, status, metodo_pagamento) VALUES (${valor}, '${status}', '${metodo_pagamento}')`
        )

        res.json(newTransaction.rows[0])

    }catch (erro){
        console.error("Um erro ocorreu:")
        console.error(erro.mensagem)
        res.status(500).send('Erro a o Registra Transação');
    }

});

// Iniciar o servidor
app.listen(process.env.NODE_PORT, () => {
  console.log(`API rodando em http://localhost:${process.env.NODE_PORT}`);
});