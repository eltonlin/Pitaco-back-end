var connection = require('../../config/dbConnection');

var usuarioMasterDAO = function(usuario_master){
    this.login_master = usuario_master.login_master ;
    this.senha  = usuario_master.senha ;
    this.nome = usuario_master.nome;
} 


usuarioMasterDAO.loginUsuarioMaster = function(login_master, senha,result){  
    connection.query(`SELECT * FROM usuario_master WHERE login_master = '${login_master}' and senha = '${senha}' `, function (error, results, fields) {
        if(error){            
            result({code : 400, message: 'Erro ao efetuar o login, por favor verifique seu usuário e senha'});
        }        
        else if(results[0] == undefined){
            console.log(results[0]);
            result({code : 400, message: 'Login ou senha inválido'}); 
        }
        else if (results){        
            result({code : 200, message: 'Login efetuado com sucesso'}); 
        }
    });
    
}

module.exports = usuarioMasterDAO;