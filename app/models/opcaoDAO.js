var connection = require('../../config/dbConnection');

var opcaoDAO = function (opcao) {
    this.descricao_opcao = opcao.descricao_opcao;
    this.id_pergunta = opcao.id_pergunta;
};


opcaoDAO.consultarTodasOpcoes = function (result) {
    connection.query('select * from opcao', function (err, res) {
        if (err)
            result(err, null);
        else
            result(null, res);
    });
};

opcaoDAO.consultarOpcaoPorPergunta = function (id_pergunta, result) {
    connection.query('select * from opcao WHERE id_pergunta = ?', id_pergunta, function (err, res) {
        if (err)
            result(err, null);
        else
            result(null, res);
    })
}


opcaoDAO.inserirOpcao = function (opcao) {
    return new Promise((resolve, reject) => { 
        connection.query('INSERT into OPCAO set ?', opcao, function (err, res) {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        });        
    });
}



module.exports = opcaoDAO;