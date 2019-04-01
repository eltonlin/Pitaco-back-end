var connection = require('../../config/dbConnection');

var interesseDAO = function(interesse){
    this.descricao = interesse.descricao;
}


interesseDAO.listarInteresses = function(result){
    connection.query('SELECT * FROM interesse', function(error, resultado){
        if(error)
            result({code: 400, message: "Houve um erro ao buscar os interesses"});
        else 
            result(resultado);
    })
};

interesseDAO.inserirInteresse = function(interesse, resultado){
    connection.query('INSERT INTO INTERESSE SET ?', interesse, function(err, result){
        if(err){
            resultado({code: 400, mesage : ` Ocorreu um erro ao inserir o interesse ${interesse.descricao}` }); 
        }
        resultado({code: 200, message : `O interesse ${interesse.descricao} foi cadastro com sucesso`});
    })
}

module.exports = interesseDAO;



