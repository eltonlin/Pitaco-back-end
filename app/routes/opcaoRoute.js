var opcaoController = require('../controllers/opcaoController.js');

module.exports = function (app) {
    app.get('/opcao', opcaoController.consultarTodasOpcoes)
        .post('/opcao', opcaoController.inserirOpcao);

    app.get('/pergunta/:id_pergunta/opcao', opcaoController.consultarOpcaoPorPergunta);

    app.put('/opcao/atualizar', opcaoController.atualizarOpcao);

    app.delete('/opcao/deletar/:id_opcao', opcaoController.deletarOpcao);

};