const respostaDAO = require('../models/respostaDAO')

exports.inserirResposta = function (req, res) {

    var resposta = new respostaDAO(req.body);

    if (!resposta.opcoes)
        return res.status(400).send({ code: 400, message: 'A opção é obrigatório' });
    if (!resposta.login_usuario)
        return res.status(400).send({ code: 400, message: 'O login_usuario é obrigatório' });

    respostaDAO.inserirResposta(resposta)    
    .then(() => res.json({ message: `Respostas do usuário ${resposta.login_usuario} foram cadastrados com sucesso` }))
    .catch(() => res.status(400).send({ message: `Ocorreu um erro ao cadastrar as respostas do usuário ${resposta.login_usuario}` }))       
};

exports.consultarRespostasPorOpcao = function (req, res) {
    const id_opcao = req.headers.id_opcao;
    
    if (!id_opcao)
        return res.status(400).send({ code: 400, message: 'O id da opção é obrigatório' });

    respostaDAO.consultarRespostasPorOpcao(id_opcao, function (err, result) {
        if (err)
            return res.status(400).send(err);
        else 
            return res.status(200).json(result);
    });

};