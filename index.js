require('dotenv').config();

const pool = require('./connections/db')
const express = require('express')
const app = express()

// Middleware para parsear JSON
app.use(express.json());

// Rota GET simples
app.get('/getAll', (req, res) => {




    //res.send('Rota para receber tudo disponivel no banco de dados');
});


// Rota GET simples
app.get('/gettransactions', (req, res) => {
    res.send('Rota para pega transações com uso de filtros');
  });

// Rota POST exemplo
app.post('/newTransaction', async (req, res) => {

    try{
        const { valor, status, metodo_pagamento} = req.body

        const newTransaction = await pool.query(
            `INSERT INTO transactions (valor, status, metodo_pagamento) VALUES (${valor}, ${status}, ${metodo_pagamento})`
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