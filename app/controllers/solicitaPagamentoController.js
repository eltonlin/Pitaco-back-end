const solicitaPagamentoDAO = require('../models/solicitaPagamentoDAO')

exports.listarSolicitacoesNaoPagas = function(req, res){
    solicitaPagamentoDAO.listarSolicitacoesNaoPAGAS()
    .then(result => res.json(result))
    .catch(() => res.status(400).send({message: 'Erro ao listar as solicitações' }))
}

exports.inserirSolicitacao = function(req, res){
    solicitaPagamento = new solicitaPagamentoDAO(req.body);

    if(!solicitaPagamento.conta)
        return res.status(400).send({message: 'O número da conta é obrigatório'});
    if(!solicitaPagamento.agencia)
        return res.status(400).send({message: 'O número da agência é obrigatório'});
    if(!solicitaPagamento.usuario_final)
        return res.status(400).send({message: 'O usuário é obrigatório'});
    if(!solicitaPagamento.banco)
        return res.status(400).send({message: 'O nome do banco é obrigatório'});
    if(!solicitaPagamento.tipo_conta)
        return res.status(400).send({message: 'O tipo da conta é obrigatório'});
    if(!solicitaPagamento.valor)
        return res.status(400).send({message: 'O valor é obrigatório'});
    
    solicitaPagamento.pago = 'NAO';


    solicitaPagamentoDAO.inserirSolicitacao(solicitaPagamento)
    .then(() => res.json({ message: 'Solicitação inserida com sucesso' }))
    .catch(() => res.status(400).send({ message: 'Erro ao inserir a solicitação de pagamento'}))
}


exports.atualizaSolicitacaoParaPago = function(req, res) {
    idSolicitacao = req.body.id_solicitacao;

    if(!idSolicitacao){
        return res.status(400).send({message: 'O id da solicitação é obrigatório'})
    }

    solicitaPagamentoDAO.atualizaSolicitacaoParaPago(idSolicitacao)
    .then(() => res.json({message: 'Atualizado com sucesso'}))
    .catch(() => res.status(400).send({message: 'Erro ao atualizar a solicitação para pago'}))
}

exports.historicoSolicitacaoPorUsuario = function(req, res) {
    loginUsuario = req.params.usuario;

    if(!loginUsuario){
        return res.status(400).send({message: 'O login do usuário é obrigatório'});
    }

    solicitaPagamentoDAO.historicoSolicitacaoPorUsuario(loginUsuario)
    .then(solicitacoes => res.json(solicitacoes))
    .catch(() => res.status(400).send({message : `Erro ao buscar o histórico de solicitações do usuário ${loginUsuario}`}))
}