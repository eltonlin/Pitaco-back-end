var connection = require('../../config/dbConnection');

var empresaDAO = function(empresa){
    this.nome_empresa = empresa.nome_empresa;
    this.cnpj = empresa.cnpj;
    this.login_master = empresa.login_master;
} ;


empresaDAO.listarEmpresas = function getAllEmpresas(result){   
    connection.query('select * from empresa', function(err, res){
        if(err)           
            result(err, null);        
        else            
            result(null, res);        
    });
};


empresaDAO.consultarEmpresaPorId = function(id_empresa, result){
    connection.query('select * from empresa where id_empresa = ?', id_empresa, function(err, res){
        if(err)
            result(err, null);
        else result(null, res);
    });
};

empresaDAO.inserirEmpresa = function(empresa, result){
    connection.query('INSERT into EMPRESA set ?', empresa, function(err, res){
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



module.exports = empresaDAO;