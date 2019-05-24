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


respostaDAO.consultarQuantidadeRespostasPorQuestionario = function(id_questionario, id_opcao, params) {
    return new Promise((resolve,reject) => {
        let sql = `select count(respostas.id_opcao) as quantidade from respostas 
        inner join opcao on respostas.id_opcao = opcao.id_opcao
        inner join pergunta on pergunta.id_pergunta = opcao.id_pergunta
        inner join questionario on questionario.id_questionario = pergunta.id_questionario where questionario.id_questionario = ${id_questionario} and opcao.id_opcao = ${id_opcao}
        and respostas.login_usuario in (select user.login_usuario from usuario_final user inner join endereco as ed on ed.login_usuario = user.login_usuario where 1 = 1`;


        if(params.dataInicial && params.dataFinal){                       
            sql += ` and user.data_nascimento between '${params.dataFinal}' and '${params.dataInicial}' ` ;
        }
        else if (params.dataInicial){
            sql += ` and user.data_nascimento < '${params.dataInicial}'  ` ;
        }
        else if (params.dataFinal) {
            sql += ` and user.data_nascimento > '${params.dataFinal}'  ` ;
        }

        if(params.estado){
            sql += ` and ed.estado = '${params.estado}' `;
        }
        if (params.cidade){
            sql += ` and ed.cidade = '${params.cidade}' `;
        }

        sql += `)`;
        

        connection.query(sql , function(err, result){
            if(err){
                reject();
            }
            else{
                resolve(result);
            }
        });
    });
};



module.exports = respostaDAO;