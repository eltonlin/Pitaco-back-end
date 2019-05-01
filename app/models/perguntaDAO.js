var connection = require('../../config/dbConnection');

var perguntaDAO = function (pergunta) {
    this.descricao_pergunta = pergunta.descricao_pergunta;
    this.id_questionario = pergunta.id_questionario;
    this.tipo_pergunta = pergunta.tipo_pergunta;
};


perguntaDAO.consultarTodasPerguntas = function (result) {
    connection.query('select * from pergunta', function (err, res) {
        if (err)
            result(err, null);
        else
            result(null, res);
    });
};
perguntaDAO.consultarPerguntasPorQuestionario = function (id_questionario, result) {
    return new Promise((resolve, reject) => {
        connection.query('select * from pergunta where id_questionario = ?', id_questionario, function (err, res) {
        if (err)
            reject();
        else
            resolve(res);
        });
    });
}

perguntaDAO.consultarPerguntaPorId = function (id_pergunta, result) {
    connection.query('select * from pergunta WHERE id_pergunta = ?', id_pergunta, function (err, res) {
        if (err)
            result(err, null);
        else
            result(null, res);
    })
}


perguntaDAO.inserirPergunta = function (pergunta) {
    return new Promise((resolve, reject) => {
        connection.query('INSERT into PERGUNTA set ?', pergunta, function (err, pergunta) {
            if (err) {
                reject(err);
            } else {
                resolve(pergunta.insertId);
            }
        });
    });
}



module.exports = perguntaDAO;