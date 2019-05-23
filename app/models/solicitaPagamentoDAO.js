const connection = require('../../config/dbConnection');


var solicitaPagamentoDAO = function (solicitaPagamento) {
    this.usuario_final = solicitaPagamento.usuario_final;
    this.agencia = solicitaPagamento.agencia;
    this.conta = solicitaPagamento.conta;
    this.valor = solicitaPagamento.valor;
    this.pago = solicitaPagamento.pago;
    this.tipo_conta = solicitaPagamento.tipo_conta;
    this.banco = solicitaPagamento.banco;
};



solicitaPagamentoDAO.listarSolicitacoesNaoPAGAS = function(){
    return new Promise((resolve, reject) => {
        connection.query(`select solicita_pagamento.*, usuario_final.cpf, usuario_final.nome from solicita_pagamento
        inner join usuario_final on solicita_pagamento.usuario_final = usuario_final.login_usuario
        WHERE solicita_pagamento.pago = 'NAO' `, function(err, result){
            if(err)
                reject();
            else
                resolve(result);
        });
    });
}


solicitaPagamentoDAO.inserirSolicitacao = function(solicitacao){
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO solicita_pagamento set ?`, solicitacao, function(err, result){
            if(err){
                console.log(err);
                reject();
            }
            else
                resolve();
        });
    });
}


solicitaPagamentoDAO.atualizaSolicitacaoParaPago = function(idSolicitacao) {
    return new Promise((resolve, reject) => {
        connection.query(`update solicita_pagamento set pago = 'SIM' where id_solicitacao = ${idSolicitacao} `, function(err, result){
            if(err)
                reject();
            else
                resolve();
        });
    });
}


solicitaPagamentoDAO.historicoSolicitacaoPorUsuario = function(loginUsuario) {
    return new Promise((resolve,reject) => {
        connection.query(`SELECT * from solicita_pagamento where solicita_pagamento.usuario_final = '${loginUsuario}' `, function(err, result){
            if(err){
                reject();
            }
            else {
                resolve(result);
            }
        });
    });
}

module.exports = solicitaPagamentoDAO;