function createWhereForDataHora(data_inicial,data_final){

    if(data_inicial != null && data_final !=null){

        return `'${data_inicial}' and '${data_final}'` 
    }

    return null

}

module.exports = createWhereForDataHora