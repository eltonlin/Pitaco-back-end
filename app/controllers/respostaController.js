const respostaDAO = require('../models/respostaDAO')

exports.inserirResposta = function(req, res) {
    
    var resposta = new respostaDAO(req.body);
    console.log(resposta);

    if(!resposta.id_opcao)
        res.status(400).send({error: true, message : 'A opção é obrigatório'});  
    if(!resposta.login_final)
        res.status(400).send({error: true, message : 'O login_final é obrigatório'}); 
    
    respostaDAO.inserirResposta(resposta, function(err, result){
        if(err)
            res.send(err);
        res.status(200).json(result);
    });
};

exports.consultarRespostasPorOpcao = function(req, res){
    const id_opcao = req.headers.id_opcao;

    if(!id_opcao)
    res.status(400).send({error: true, message: 'O id da opção é obrigatório'});

    respostaDAO.consultarRespostasPorOpcao(id_opcao, function(err, result){
        if(err)
            res.status(400).send(err);
        res.status(200).json(result);
    });

};