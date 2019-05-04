const respostaController = require('../controllers/respostaController');

module.exports = function (app) {
    app.get('/resposta', respostaController.consultarRespostasPorOpcao)
        .post('/resposta', respostaController.inserirResposta);

    app.get('/resposta/quantidade_por_questionario/:id_questionario', respostaController.consultarQuantidadeRespostasPorQuestionario);
}