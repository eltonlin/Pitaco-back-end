const solicitaPagamentoController = require('../controllers/solicitaPagamentoController');

module.exports = function(app) {
    app.get('/solicita_pagamento/listar', solicitaPagamentoController.listarSolicitacoesNaoPagas)
        .post('/solicita_pagamento/cadastrar', solicitaPagamentoController.inserirSolicitacao)
        .put('/solicita_pagamento/atualizar', solicitaPagamentoController.atualizaSolicitacaoParaPago);
    
    app.get('/solicita_pagamento/pago', solicitaPagamentoController.listarSolicitacoesPagas);        
    
    app.get('/solicita_pagamento/:usuario', solicitaPagamentoController.historicoSolicitacaoPorUsuario);

}