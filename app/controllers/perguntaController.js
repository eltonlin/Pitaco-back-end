const perguntaDAO = require('../models/perguntaDAO')

exports.consultarTodasPerguntas = function (req, res) {
    perguntaDAO.consultarTodasPerguntas(function (err, perguntas) {
        if (err)
            return res.status(400).send(err);
        else 
            return res.status(200).json(perguntas);
    })
};


exports.consultarPerguntasPorQuestionario = function (req, res) {
    const id_questionario = req.params.id_questionario;

    if (!id_questionario)
        return res.status(400).send({ message: 'O id do questionário é obrigatório' })

    perguntaDAO.consultarPerguntasPorQuestionario(function (id_questionario, err, perguntas) {
        if (err)
            return res.status(400).send(err);
        else 
            return res.status(200).json(perguntas);
    })
};



exports.inserirPergunta = function (req, res) {
    console.log(req.body);
    var pergunta = new perguntaDAO(req.body);

    if (!pergunta.descricao_pergunta)
        res.status(400).send({ code: 400, message: 'A descriçäo da pergunta é obrigatório' });
    if (!pergunta.id_questionario)
        res.status(400).send({ code: 400, message: 'O id do questionário é obrigatório' });
    if (!pergunta.tipo_pergunta)
        res.status(400).send({ code: 400, message: 'O tipo da pergunta é obrigatório' });

    perguntaDAO.inserirPergunta(pergunta, function (err, result) {
        if (err)
            res.send(err);
        res.status(200).json(result);
    })
};

exports.consultarPerguntaPorId = function (req, res) {
    var id_pergunta = req.params.id_pergunta;
    perguntaDAO.consultarPerguntaPorId(id_pergunta, function (err, result) {
        if (err)
            res.send(err);
        res.status(200).json(result);
    })
}


