
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

usuarioFinalDAO.login = function(login_usuario, senha,result){  
    connection.query(`SELECT * FROM usuario_final WHERE login_usuario = '${login_usuario}' and senha = '${senha}' `, function (error, results, fields) {
        if(error){            
            result({code : 400, message: 'Erro ao efetuar o login, por favor verifique seu usuário e senha'});
        }        
        else if(results[0] == undefined || results[0] == null){
            result({code : 400, message: 'Login ou senha inválido'}); 
        }
        else if (results){        
            result({code : 200, message: 'Login efetuado com sucesso'}); 
        }
    });
    
}


usuarioFinalDAO.verificaLoginExistente = function(login_usuario, resultado){
    console.log('está passando o usuário: ' + login_usuario);
    connection.query(`SELECT * FROM usuario_final where login_usuario = '${login_usuario}' `, function(error, result){
        if(error){
            console.log(error);
            resultado({code : 400, message: 'Ocorreu um erro ao executar a função para buscar o login do usuario'});
        }
        else if(result[0] !== undefined){
            console.log(result);            
            resultado({code : 400, message: 'Já existe um usuário cadastrado com esse login'});
        }
        else{
            resultado({code:200});
        }
    })
}

module.exports = usuarioFinalDAO;

