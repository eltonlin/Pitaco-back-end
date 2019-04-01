const questionarioDAO = require('../models/questionarioDAO')

exports.consultarTodosQuestionarios = function(req, res){
    questionarioDAO.consultarTodosQuestionarios(function(err, questionarios){
        if (err)
            res.send(err);                
        res.json(questionarios);
    })    
};


exports.inserirQuestionario = function(req, res) {
    console.log(req.body);
    var questionario = new questionarioDAO(req.body);

    if(!questionario.descricao_questionario)
        res.status(400).send({code: 400, message : 'A descriçäo do questionario é obrigatório'});    
    if(!questionario.id_empresa)
        res.status(400).send({code: 400, message : 'A empresa é obrigatória'});       
    if(!questionario.login_master)
        res.status(400).send({code: 400, message : 'O login_master é obrigatório'}); 
    
    questionarioDAO.inserirQuestionario(questionario, function(err, result){
        if(err)
            res.send(err);
        res.status(200).json(result);
    })
};

exports.consultarQuestionarioPorId = function(req, res){
    var id_questionario = req.params.id_questionario;
    questionarioDAO.consultarQuestionarioPorId(id_questionario, function(err, result){
        if(err)
            res.send(err);
        res.status(200).json(result);
    })
}


