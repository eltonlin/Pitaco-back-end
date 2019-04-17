const opcaoDAO = require('../models/opcaoDAO')

exports.consultarTodasOpcoes = function (req, res) {
    opcaoDAO.consultarTodasOpcoes(function (err, perguntas) {
        if (err)
            return res.send(err);
        else
            return res.json(perguntas);
    })
};

exports.inserirOpcao = function (req, res) {
    var opcao = new opcaoDAO(req.body);

    if (!opcao.descricao_opcao)
        return res.status(400).send({ code: 400, message: 'A descriçäo da opção é obrigatória' });
    if (!opcao.id_pergunta)
        return res.status(400).send({ code: 400, message: 'O id da pergunta é obrigatório' });

    opcaoDAO.inserirOpcao(opcao, function (err, result) {
        if (err)
            return res.status(400).send(err);
        else
            return res.status(200).json(result);
    })
};

exports.consultarOpcaoPorPergunta = function (req, res) {
    var id_pergunta = req.params.id_pergunta;
    opcaoDAO.consultarOpcaoPorPergunta(id_pergunta, function (err, result) {
        if (err)
            return res.status(400).send(err);
        else 
            return res.status(200).json(result);
    })
}


