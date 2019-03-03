var connection = require('../../config/dbConnection');

var perguntaDAO = function(pergunta){
    this.descricao_pergunta  = pergunta.descricao_pergunta;
    this.id_questionario = pergunta.id_questionario;
    this.tipo_pergunta = pergunta.tipo_pergunta;  
} ;


perguntaDAO.consultarTodasPerguntas = function(result){   
    connection.query('select * from pergunta', function(err, res){
        if(err)           
            result(err, null);        
        else            
            result(null, res);        
    });
};

perguntaDAO.consultarPerguntaPorId = function(id_pergunta, result){
    connection.query('select * from pergunta WHERE id_pergunta = ?', id_pergunta, function(err, res){
        if(err)
            result(err, null);
        else
            result(null, res);
    })
}


perguntaDAO.inserirPergunta = function(questionario, result){
    connection.query('INSERT into PERGUNTA set ?', questionario, function(err, res){
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



module.exports = perguntaDAO;