var connection = require('../../config/dbConnection');

var interesseDAO = function (interesse) {
    this.descricao = interesse.descricao;
}


interesseDAO.listarInteresses = function (result) {
    connection.query('SELECT * FROM interesse', function (error, resultado) {
        if (error)
            result({ message: "Houve um erro ao buscar os interesses" }, null);
        else
            result(null, resultado);
    })
};

interesseDAO.inserirInteresse = function (interesse, resultado) {
    connection.query('INSERT INTO INTERESSE SET ?', interesse, function (err, result) {
        if (err) {
            resultado({ mesage: ` Ocorreu um erro ao inserir o interesse ${interesse.descricao}` }, null);
        }
        resultado(null, { message: `O interesse ${interesse.descricao} foi cadastro com sucesso` });
    })
}

module.exports = interesseDAO;



