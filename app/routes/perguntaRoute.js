var perguntaController = require('../controllers/perguntaController.js');

module.exports = function (app) {
    app.get('/pergunta', perguntaController.consultarTodasPerguntas)
        .post('/pergunta', perguntaController.inserirPergunta);

    app.get('/pergunta/:id_pergunta', perguntaController.consultarPerguntaPorId);

    app.get('/pergunta/:id_questionario', perguntaController.consultarPerguntasPorQuestionario)

};