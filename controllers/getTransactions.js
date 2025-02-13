const pool = require('../connections/db')
const createWhereForDataHora = require("../utils/formatDatahoraForWhere")

function _appendWhere(headers){

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

    console.log(headers)
    
    whereArray= [] 

    const { id, valor, status, metodo_pagamento, data_inicial, data_final } = headers;

    data = createWhereForDataHora(data_inicial,data_final)

    const whereValues = [
        { key: 'id', value: id, format: (v) => v }, 
        { key: 'valor', value: valor, format: (v) => v }, 
        { key: 'status', value: status, format: (v) => `'${v}'` }, 
        { key: 'metodo_pagamento', value: metodo_pagamento, format: (v) => `'${v}'` }, 
        { key: 'datahora_transaction', value: data, format: (v) => v}
    ];

    whereValues.forEach(({ key, value, format }) => {


        if (value != null && value !== '') { 

            if(key != 'datahora_transaction'){

                whereArray.push(`${key} = ${format(value)}`);

            }else{
                
                whereArray.push(`${key} between ${value}`)
            }

        }
    });
    

    if(whereArray.length == 0){

        return null
    }else{

        where = "where "+whereArray.join(" AND ")


        return where
    }
    
}


async function getTransactions(req, res) {

    try{

        where = _appendWhere(req.headers)

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
    
}

module.exports = getTransactions