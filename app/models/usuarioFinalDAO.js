
var connection = require('../../config/dbConnection');

var usuarioFinalDAO = function(usuario_final){
    this.login_usuario = usuario_final.login_usuario ;
    this.senha  = usuario_final.senha ;
    this.nome = usuario_final.nome;
    this.cpf = usuario_final.cpf;
    this.faixa_salarial  = usuario_final.faixa_salarial;
    this.data_nascimento = usuario_final.data_nascimento;
    this.pontuacao = usuario_final.pontuacao;
} ;

usuarioFinalDAO.inserirUsuario = function(usuario_final, result){
    connection.query('INSERT into usuario_final set ?', usuario_final, function(err, res){
        if(err){
            console.log("error : ", err);
            result(err, null);
        }
        else{
            console.log("resultado: ", res);
            result(null, res);
        }
    });
};

usuarioFinalDAO.consultarLogin = function(usuario_final, senha,result){  
    connection.query(`SELECT * FROM usuario_final WHERE login_usuario = '${usuario_final}' and senha = '${senha}' `, function (error, results, fields) {
        console.log(results);
        if(error){
            result({error : true, message: 'Erro ao efetuar o login, por favor verifique seu usuário e senha'});
        }
        else if (results[0] == undefined || results[0] == null){
            result({error : true, message: 'Erro ao efetuar o login, por favor verifique seu usuário e senha'}); 
        }
        else {
            result({error: false});
        }
      });
    
    }

module.exports = usuarioFinalDAO;

