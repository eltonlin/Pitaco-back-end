var connection = require('../../config/dbConnection');

var questionarioDAO = function(questionario){
    this.descricao_questionario = questionario.descricao_questionario;
    this.id_empresa = questionario.id_empresa;
    this.pontuacao_questionario = questionario.pontuacao_questionario;
    this.login_master = questionario.login_master
} ;


questionarioDAO.consultarTodosQuestionarios = function(result){   
    connection.query('select * from questionario', function(err, res){
        if(err)           
            result(err, null);        
        else            
            result(null, res);        
    });
};

questionarioDAO.consultarQuestionarioPorId = function(id_questionario, result){   
    connection.query('select * from questionario where id_questionario = ? ', id_questionario , function(err, res){
        if(err)           
            result(err, null);        
        else            
            result(null, res);        
    });
};


questionarioDAO.inserirQuestionario = function(questionario, result){
    connection.query('INSERT into QUESTIONARIO set ?', questionario, function(err, res){
        if(err){
            console.log("error : ", err);
            result(err, null);
        }
        else{
            console.log("resultado: ", res);
            result(null, res);
        }
    })
}



module.exports = questionarioDAO;