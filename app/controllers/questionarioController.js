const questionarioDAO = require('../models/questionarioDAO');
const perguntaDAO = require('../models/perguntaDAO');
const opcaoDAO = require('../models/opcaoDAO');
const respostaDAO = require('../models/respostaDAO')

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
        return res.status(400).send({message: 'Falha ao cadastrra o questionário'});        
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


exports.deletarQuestionario = function(req, res) {
    const questionario = req.params.id_questionario;

    questionarioDAO.deletarQuestionario(questionario)
    .then(() => res.json({message: 'Questionário deletado com sucesso'}))
    .catch(() => res.status(400).send({message: 'Erro ao deletar o questionário'}));
}

exports.atualizarQuestionario = function(req, res) {
    const questionario = req.body;

    questionarioDAO.atualizarQuestionario(questionario)
    .then(() => res.json({message: 'Questionário atualizado com sucesso'}))
    .catch(() => res.status(400).send({message: 'Erro ao atualizar o questionário'}));
}


exports.consultarPerguntasPorQuestionarioComQuantidade = function (req, res) {
    const id_questionario = req.params.id_questionario;
    const params = req.body;

    console.log(params);

    if (!id_questionario)
        return res.status(400).send({ message: 'O id do questionário é obrigatório' })
    
    if(params.idadeInicial){
        console.log('entra porque tem idade inicial');
        dataInicial = new Date();

        dataInicial.setFullYear(dataInicial.getFullYear() - params.idadeInicial);

        params.dataInicial = formatDate(dataInicial);

        
    }

    if(params.idadeFinal){
        console.log('entra porque tem idade final');
        dataFinal = new Date();

        dataFinal.setFullYear(dataFinal.getFullYear() - params.idadeFinal);

        params.dataFinal = formatDate(dataFinal);       

    }


    perguntaDAO.consultarPerguntasPorQuestionario(id_questionario)
    .then(perguntas => {
        for(let pergunta of perguntas){            
            opcaoDAO.consultarOpcaoPorPergunta(pergunta.id_pergunta)
            .then(opcao => {
                pergunta.opcoes = opcao;                
            })
            .catch(() => res.status(400).send({message: 'Erro ao buscar as perguntas'}))      
        }  
        setTimeout(() => {
            for(let pergunta of perguntas){
                for(let opcao of pergunta.opcoes){                    
                    respostaDAO.consultarQuantidadeRespostasPorQuestionario(id_questionario, opcao.id_opcao, params)
                    .then(quantidade => {
                        opcao.quantidade = quantidade[0].quantidade;
                    })
                    .catch(() => res.status(400).send({message: 'Erro ao buscar as perguntas'}))
                }      
            }            
        }, 0500);      
        setTimeout(() => {
            res.json(perguntas);
        }, 1000);
    })
    .catch(() => res.status(400).send({message: 'Erro ao buscar as perguntas'}))
       

};

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}