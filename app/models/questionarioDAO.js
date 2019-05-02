var connection = require('../../config/dbConnection');

var questionarioDAO = function (questionario) {
    this.descricao_questionario = questionario.descricao_questionario;
    this.empresa_cnpj = questionario.empresa_cnpj;
    this.pontuacao_questionario = questionario.pontuacao_questionario;
    this.login_master = questionario.login_master;
    this.id_interesse = questionario.id_interesse;
};


questionarioDAO.consultarTodosQuestionarios = function (result) {
    connection.query('select * from questionario', function (err, res) {
        if (err)
            result(err, null);
        else
            result(null, res);
    });
};

questionarioDAO.consultarQuestionarioPorId = function (id_questionario, result) {
    connection.query('select * from questionario where id_questionario = ? ', id_questionario, function (err, res) {
        if (err)
            result(err, null);
        else
            result(null, res);
    });
};


questionarioDAO.inserirQuestionario = function (questionario) {
    return new Promise(function(resolve,reject){
        connection.query('INSERT into QUESTIONARIO set ?', questionario, function (err, res) {
            if (err) {
                reject(err);
            }
            else {
                resolve(res.insertId);
            }
        })
    }) 
}

questionarioDAO.questionariosPorInteressesPorUsuarios = function(usuario) {
    return new Promise((resolve, reject) => {
        connection.query(`select * from questionario where id_interesse in (select id_interesse from usuario_final_interesse where login_usuario = '${usuario}') 
                        and id_questionario not in (select questionario.id_questionario from respostas 
                            inner join opcao on respostas.id_opcao = opcao.id_opcao
                            inner join pergunta on pergunta.id_pergunta = opcao.id_pergunta
                            inner join questionario on questionario.id_questionario = pergunta.id_questionario)  `, function(err, result){
            if(err){
                reject();
            }
            else {
                resolve(result);
            }
        })
    })
}


module.exports = questionarioDAO;