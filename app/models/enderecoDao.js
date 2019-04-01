var connection = require('../../config/dbConnection');

var enderecoDAO = function(endereco){
    this.rua  = endereco.rua ;
    this.complemento  = endereco.complemento ;
    this.bairro = endereco.bairro;
    this.cidade = endereco.cidade;
    this.cep  = endereco.cep;
    this.estado = endereco.estado;
    this.login_usuario = endereco.login_usuario;
 
} ;

enderecoDAO.inserirEndereco = function(endereco , result){
    connection.query('INSERT into endereco  set ?', endereco , function(err, res){
        if(err){            
            result({code : 400, message: "Houve um erro para o cadastro do endereço" });
        }
        else{
            result({code : 200, message: "Cadastro do usuário realizado com sucesso!" });            
        }
    });
};

module.exports = enderecoDAO;