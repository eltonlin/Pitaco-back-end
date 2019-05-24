const connection = require('../../config/dbConnection');


var solicitaPagamentoDAO = function (solicitaPagamento) {
    this.usuario_final = solicitaPagamento.usuario_final;
    this.agencia = solicitaPagamento.agencia;
    this.conta = solicitaPagamento.conta;
    this.valor = solicitaPagamento.valor;
    this.pago = solicitaPagamento.pago;
    this.tipo_conta = solicitaPagamento.tipo_conta;
    this.banco = solicitaPagamento.banco;
    this.data_solicitacao = solicitaPagamento.data_solicitacao;
    this.data_pagamento = solicitaPagamento.data_pagamento;
};



solicitaPagamentoDAO.listarSolicitacoesNaoPAGAS = function(){
    return new Promise((resolve, reject) => {
        connection.query(`select sol.id_solicitacao, sol.usuario_final, sol.banco, sol.tipo_conta, sol.agencia, sol.conta, sol.valor, DATE_FORMAT(sol.data_solicitacao, '%d/%m/%Y') data_solicitacao, usuario_final.cpf, usuario_final.nome from solicita_pagamento sol
        inner join usuario_final on sol.usuario_final = usuario_final.login_usuario
        WHERE sol.pago = 'NAO' `, function(err, result){
            if(err)
                reject();
            else
                resolve(result);
        });
    });
}


solicitaPagamentoDAO.listarSolicitacoesPAGAS = function(){
    return new Promise((resolve, reject) => {
        connection.query(`select sol.id_solicitacao, sol.usuario_final, sol.banco, sol.tipo_conta, sol.agencia, sol.conta, sol.valor, DATE_FORMAT(sol.data_pagamento, '%d/%m/%Y') data_pagamento, usuario_final.cpf, usuario_final.nome from solicita_pagamento sol
        inner join usuario_final on sol.usuario_final = usuario_final.login_usuario
        WHERE sol.pago = 'SIM' `, function(err, result){
            if(err){
                reject();
            }
            else{
                resolve(result);
            }
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
        connection.query(`update solicita_pagamento set pago = 'SIM', data_pagamento = NOW() where id_solicitacao = ${idSolicitacao} `, function(err, result){
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