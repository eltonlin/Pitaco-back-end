var connection = require('../../config/dbConnection');

var empresaDAO = function(empresa){
    this.nome_empresa = empresa.nome_empresa;
    this.cnpj = empresa.cnpj;
    this.usuario_master = empresa.usuario_master;
} ;


empresaDAO.listarEmpresas = function getAllEmpresas(result){   
    connection.query('select * from empresa', function(err, res){
        if(err){
            console.log(err);
            result(null, err);
        }
        else{
            console.log('tasks : ', res);  
            result(null, res);
        }
    });
};

module.exports = empresaDAO;