var questionarioController = require('../controllers/questionarioController.js');

module.exports = function (app) {
    app.get('/questionario', questionarioController.consultarTodosQuestionarios)
        .post('/questionario', questionarioController.inserirQuestionario);

    app.get('/questionario/:id_questionario', questionarioController.consultarQuestionarioPorId);
    app.get('/questionario/usuario/:usuario', questionarioController.questionariosPorInteressesPorUsuarios);

    app.delete('/questionario/deletar/:id_questionario', questionarioController.deletarQuestionario);
    
    app.put('/questionario/atualizar', questionarioController.atualizarQuestionario);

    app.post('/questionario/:id_questionario/detalhe/', questionarioController.consultarPerguntasPorQuestionarioComQuantidade)

};