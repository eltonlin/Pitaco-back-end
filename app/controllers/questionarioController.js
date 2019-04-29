const questionarioDAO = require('../models/questionarioDAO');
const perguntaDAO = require('../models/perguntaDAO');
const opcaoDAO = require('../models/opcaoDAO');

exports.consultarTodosQuestionarios = function (req, res) {
    questionarioDAO.consultarTodosQuestionarios(function (err, questionarios) {
        if (err)
            return res.status(400).send(err);
        else
            return res.status(200).json(questionarios);
    })
};


exports.inserirQuestionario = async function (req, res) {
    var questionario = req.body;
    var questionarioInsert = new questionarioDAO(questionario);

    if (!questionario.descricao_questionario)
        return res.status(400).send({ message: 'A descriçäo do questionario é obrigatório' });
    if (!questionario.empresa_cnpj)
        return res.status(400).send({ message: 'O cnpj da empresa é obrigatório' });
    if (!questionario.login_master)
        return res.status(400).send({ message: 'O login_master é obrigatório' });
    for(pergunta of questionario.perguntas){
        if(!pergunta.descricao_pergunta)
            return res.status(400).send({message: 'A descrição da pergunta é obrigatório'});
        if(!pergunta.tipo_pergunta)
            return res.status(400).send({message: 'O tipo da pergunta é obrigatório'});
        for(opcao of pergunta.opcoes){
            if(!opcao.descricao_opcao)
                return res.status(400).send({message: 'A descrição da opção é obrigatório'});
        }
    }
    
    try {
        questionarioId = await questionarioDAO.inserirQuestionario(questionarioInsert);
        for(pergunta of questionario.perguntas){                        
            pergunta.id_questionario = questionarioId;
            perguntaInsert = new perguntaDAO(pergunta);
            perguntaId = await perguntaDAO.inserirPergunta(perguntaInsert);
            for(opcao of pergunta.opcoes){
                opcao.id_pergunta = perguntaId;
                opcaoInsert = new opcaoDAO(opcao);
                await opcaoDAO.inserirOpcao(opcaoInsert);
            }
        }
        res.json({message: 'Questionário incluído com sucesso'});        
    } catch (error) {        
        return res.sendStatus(400);        
    }
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

exports.questionariosPorInteressesPorUsuarios = function(req,res) {
    const usuario = req.params.usuario;
    questionarioDAO.questionariosPorInteressesPorUsuarios(usuario)
    .then(result => res.json(result))
    .catch(() => res.status(400).send({message : `Erro ao buscar os questionários do usuário ${usuario}`}));
}