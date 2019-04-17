var connection = require('../../config/dbConnection');

var respostaDAO = function (resposta) {
    this.id_opcao = resposta.id_opcao;
    this.login_usuario = resposta.login_usuario;
};


respostaDAO.consultarRespostasPorOpcao = function (id_opcao, result) {
    connection.query('select * from respostas where id_opcao = ?', id_opcao, function (err, res) {
        if (err)
            result(err, null);
        else
            result(null, res);
    });
};

respostaDAO.consultarOpcaoPorPergunta = function (id_pergunta, result) {
    connection.query('select * from opcao WHERE id_pergunta = ?', id_pergunta, function (err, res) {
        if (err)
            result(err, null);
        else
            result(null, res);
    })
}


respostaDAO.inserirResposta = function (resposta, result) {
    connection.query('INSERT into RESPOSTAS set ?', resposta, function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
            result(null, res);
        }
    })
}



module.exports = respostaDAO;