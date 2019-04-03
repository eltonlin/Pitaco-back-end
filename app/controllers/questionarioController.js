const questionarioDAO = require('../models/questionarioDAO')

exports.consultarTodosQuestionarios = function (req, res) {
    questionarioDAO.consultarTodosQuestionarios(function (err, questionarios) {
        if (err)
            return res.status(400).send(err);
        else 
            return res.status(200).json(questionarios);
    })
};


exports.inserirQuestionario = function (req, res) {
    var questionario = new questionarioDAO(req.body);

    if (!questionario.descricao_questionario)
        return res.status(400).send({  message: 'A descriçäo do questionario é obrigatório' });
    if (!questionario.id_empresa)
        return res.status(400).send({  message: 'A empresa é obrigatória' });
    if (!questionario.login_master)
        return res.status(400).send({  message: 'O login_master é obrigatório' });

    questionarioDAO.inserirQuestionario(questionario, function (err, result) {
        if (err)
            return res.status(400).send(err);
        else
            return res.status(200).json(result);
    })
};

exports.consultarQuestionarioPorId = function (req, res) {
    var id_questionario = req.params.id_questionario;
    questionarioDAO.consultarQuestionarioPorId(id_questionario, function (err, result) {
        if (err)
            return res.status(400).send(err);
        else
            return res.status(200).json(result);
    })
}


