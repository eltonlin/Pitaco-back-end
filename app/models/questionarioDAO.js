var connection = require('../../config/dbConnection');

var questionarioDAO = function (questionario) {
    this.descricao_questionario = questionario.descricao_questionario;
    this.empresa_cnpj = questionario.empresa_cnpj;
    this.pontuacao_questionario = questionario.pontuacao_questionario;
    this.login_master = questionario.login_master;
    this.id_interesse = questionario.id_interesse;
};


questionarioDAO.consultarTodosQuestionarios = function (result) {
    connection.query(`select questionario.*, interesse.descricao as interesse_descricao, empresa.razao_social from questionario 
                    inner join interesse on interesse.id_interesse = questionario.id_interesse
                    inner join empresa on empresa.cnpj = questionario.empresa_cnpj`, function (err, res) {
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
                            inner join questionario on questionario.id_questionario = pergunta.id_questionario where respostas.login_usuario = '${usuario}')  `, function(err, result){
            if(err){
                reject();
            }
            else {
                resolve(result);
            }
        })
    })
}

questionarioDAO.deletarQuestionario = function(questionario) {
    return new Promise((resolve, reject) => {
        connection.query(`delete from questionario where id_questionario = ${questionario}`, function(err, result){
            if(err) {
                reject();
            } else {
                resolve();
            }
        })
    })
}

questionarioDAO.atualizarQuestionario = function(questionario) {
    return new Promise((resolve, reject) => {
        connection.query(`update questionario set descricao_questionario = ${questionario.descricao_questionario}, 
        id_interesse = ${questionario.id_interesse}, pontuacao = ${questionario.pontuacao_questionario} where id_questionario = ${questionario.id_questionario}` ,
        function(err, result) {
            if(err) {
                reject();
            } else {
                resolve();
            }
        });
    });
}



module.exports = questionarioDAO;