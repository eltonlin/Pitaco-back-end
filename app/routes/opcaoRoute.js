var opcaoController = require('../controllers/opcaoController.js');

module.exports = function (app) {
    app.get('/opcao', opcaoController.consultarTodasOpcoes)
        .post('/opcao', opcaoController.inserirOpcao);

    app.get('/pergunta/:id_pergunta/opcao', opcaoController.consultarOpcaoPorPergunta);

    app.get('/opcao/count/:id_questionario')

};