function checkEnvarimentosToFilter(req, res, next){

    const { id, data_inicial, data_final, valor, status, metodo_pagamento} = req.headers


    if(id && !/^\d+$/.test(id)) return res.status(400).json({ error: "ID com falha" });

    if(valor && !/^\d+$/.test(valor)) return res.status(400).json({ error: "valor com falha" });

    if(status && !/^[a-z]+$/.test(status)) return res.status(400).json({ error: "Status com falha" });

    if(metodo_pagamento && !/^[A-Z]+$/.test(metodo_pagamento)) return res.status(400).json({ error: "Metodo Pagamento com falha" });

    if (data_inicial && !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/.test(data_inicial)) return res.status(400).json({ error: "Data inicial inválida" });
    
    if (data_final && !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/.test(data_final)) return res.status(400).json({ error: "Data inicial inválida" });

    next()

}


module.exports = checkEnvarimentosToFilter