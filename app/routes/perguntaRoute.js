var perguntaController = require('../controllers/perguntaController.js');

module.exports = function (app) {
    app.get('/pergunta', perguntaController.consultarTodasPerguntas)
        .post('/pergunta', perguntaController.inserirPergunta);

    //este lista apenas as perguntas por questionário    
    app.get('/pergunta/listar_por_questionario/:id_pergunta', perguntaController.perguntasPorIdQuestionario);

    app.put('/pergunta/atualizar', perguntaController.atualizarPergunta);

    app.delete('/pergunta/deletar', perguntaController.deletarPergunta);
    // Este liste as perguntas com as opções
    app.get('/pergunta/:id_questionario', perguntaController.consultarPerguntasPorQuestionario)

};