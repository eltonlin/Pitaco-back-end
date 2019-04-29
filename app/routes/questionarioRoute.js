var questionarioController = require('../controllers/questionarioController.js');

module.exports = function (app) {
    app.get('/questionario', questionarioController.consultarTodosQuestionarios)
        .post('/questionario', questionarioController.inserirQuestionario);

    app.get('/questionario/:id_questionario', questionarioController.consultarQuestionarioPorId);
    app.get('/questionario/usuario/:usuario', questionarioController.questionariosPorInteressesPorUsuarios);

};