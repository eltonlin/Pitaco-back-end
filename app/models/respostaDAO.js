var connection = require('../../config/dbConnection');

var respostaDAO = function (resposta) {
    this.opcoes = resposta.opcoes;
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


respostaDAO.inserirResposta = function (respostas) {
    let records = [];

    for (i = 0; i < respostas.opcoes.length; i++) {
        records[i] = [respostas.opcoes[i], respostas.login_usuario];
    }
    return new Promise((resolve,reject) => {
        connection.query(`INSERT INTO RESPOSTAS VALUES ? `, [records], function (err, res) {
            if (err) {
                reject();
            } else {
                resolve();
            }    
        });    
    });
};


respostaDAO.consultarQuantidadeRespostasPorQuestionario = function(id_questionario, id_opcao) {
    return new Promise((resolve,reject) => {
        connection.query(`select count(respostas.id_opcao) as quantidade from respostas 
        inner join opcao on respostas.id_opcao = opcao.id_opcao
        inner join pergunta on pergunta.id_pergunta = opcao.id_pergunta
        inner join questionario on questionario.id_questionario = pergunta.id_questionario where questionario.id_questionario = 1 and opcao.id_opcao = ${id_opcao}`, function(err, result){
            if(err){
                reject();
            }
            else{
                resolve(result[0]);
            }
        });
    });
};



module.exports = respostaDAO;