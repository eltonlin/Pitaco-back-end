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

perguntaDAO.perguntasPorIdQuestionario = function (id_pergunta, result) {
    connection.query(`select * from pergunta WHERE id_questionario = ${id_pergunta}`, function (err, res) {
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

perguntaDAO.atualizarPergunta = function (pergunta) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE PERGUNTA SET descricao_pergunta = '${pergunta.descricao_pergunta}', 
                        tipo_pergunta = '${pergunta.tipo_pergunta}' where id_pergunta = ${pergunta.id_pergunta} `, function (err, result) {
                if (err) {
                    reject();
                } else {
                    resolve();
                }
            });
    });
};

perguntaDAO.deletarPergunta = function (pergunta) {
    return new Promise((resolve,reject) => {
        connection.query(`delete from pergunta where id_pergunta = ${pergunta.id_pergunta}`, function(err, result){
            if(err){
                reject();
            } else { 
                resolve();
            }
        });
    });
};



module.exports = perguntaDAO;