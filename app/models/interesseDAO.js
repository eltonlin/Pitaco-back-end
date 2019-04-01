var connection = require('../../config/dbConnection');

var interesseDAO = function(interesse){
    this.descricao = interesse.descricao;
}


interesseDAO.listarInteresses = function(result){
    connection.query('SELECT * FROM interesse', function(error, resultado){
        if(error)
            result({code: 400, message: "Houve um erro ao buscar os interesses"});
        result(resultado);
    })
};


module.exports = interesseDAO;



