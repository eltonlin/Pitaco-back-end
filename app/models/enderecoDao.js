
var connection = require('../../config/dbConnection');

var enderecoDAO = function(endereco){
    this.rua   = endereco .rua ;
    this.complemento  = endereco .complemento ;
    this.bairro = endereco .bairro;
    this.cidade = endereco .cidade;
    this.cep  = endereco .cep;
 
} ;

enderecoDAO.inserirEndereco = function(endereco , result){
    connection.query('INSERT into endereco  set ?', endereco , function(err, res){
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

module.exports = enderecoDAO;