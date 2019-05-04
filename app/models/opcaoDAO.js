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

opcaoDAO.consultarOpcaoPorPergunta = function (id_pergunta) {
    return new Promise((resolve,reject) => {
        connection.query(`select * from opcao WHERE id_pergunta = ${id_pergunta}`, function (err, opcao) {
            if (err){
                console.log(err);
                reject();
            }
            else{
                console.log(opcao);
                resolve(opcao);
            }
        });
    });
};


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


opcaoDAO.atualizarOpcao = function (opcao) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE opcao SET descricao_opcao = '${opcao.descricao_opcao}'
                        where id_opcao = ${opcao.id_opcao} `, function (err, result) {
                if (err) {
                    console.log(err);
                    reject();
                } else {
                    resolve();
                }
            });
    });
};

opcaoDAO.deletarOpcao = function (opcao) {
    return new Promise((resolve,reject) => {
        connection.query(`delete from opcao where id_opcao = ${opcao}`, function(err, result){
            if(err){
                console.log(err);
                reject();
            } else { 
                resolve();
            }
        });
    });
};


module.exports = opcaoDAO;