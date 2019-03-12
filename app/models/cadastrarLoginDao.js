
var connection = require('../../config/dbConnection');

var cadastrarLoginDao = function(usuario_final){
    this.usuario_final  = usuario_final.usuario_final ;
    this.senha  = usuario_final.senha ;
    this.nome = usuario_final.nome;
    this.cpf = usuario_final.cpf;
    this.faixa_salarial  = usuario_final.faixa_salarial;
    this.rua = usuario_final.rua;
    this.bairro = usuario_final.bairro;
    this.complemento = usuario_final.complemento;
    this.cep = usuario_final.cep

} ;

cadastrarLoginDao.inserirUsuario = function(usuario_final, result){
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

module.exports = cadastrarLoginDao;

