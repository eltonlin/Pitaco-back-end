var connection = require('../../config/dbConnection');

var empresaDAO = function (empresa) {
    this.razao_social = empresa.razao_social;
    this.nome_fantasia = empresa.nome_fantasia;
    this.cnpj = empresa.cnpj;
    this.login_master = empresa.login_master;
};


empresaDAO.listarEmpresas = function getAllEmpresas(result) {
    connection.query('select * from empresa', function (err, res) {
        if (err)
            result(err, null);
        else
            result(null, res);
    });
};


empresaDAO.consultarEmpresaPorCnpj = function (empresa_cnpj, result) {
    connection.query(`select * from empresa where cnpj = ${empresa_cnpj}`, function (err, res) {
        if (err)
            result(err, null);
        else result(null, res);
    });
};

empresaDAO.verificarCnpj = function(cnpj) {
    return new Promise((resolve, reject) => {
        connection.query(`select * from empresa where cnpj = ${cnpj}`, function (err, res) {
            if (res[0] !== undefined){
                reject();
            } else {                
                resolve();
            }
        });
    });
};

empresaDAO.verificarRazaoSocial = function(razao_social){
    return new Promise((resolve, reject) => {
        connection.query(`select * from empresa where razao_social = '${razao_social}'`, function(err, result){
            if (result[0] !== undefined){  
                reject();
            }
            else
                resolve();
        })
    })
}

empresaDAO.inserirEmpresa = function (empresa) {
    return new Promise((resolve, reject) => {
        connection.query('INSERT into EMPRESA set ?', empresa, function (err, res) {
            if (err) {
                reject();
            }
            else {
                resolve();
            }
        });
    });
};

empresaDAO.atualizarEmpresa = function(empresa){
    return new Promise((resolve ,reject ) => {
        connection.query( `UPDATE empresa set razao_social = '${empresa.razao_social}', nome_fantasia = '${empresa.nome_fantasia}' ,
        login_master = '${empresa.login_master}' 
        WHERE cnpj = '${empresa.cnpj}'`, function(err, resultadoEmpresa){
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        })
    }

    empresaDAO.deletarEmpresa = function(empresa, resultado){
        connection.query(`DELETE FROM EMPRESA WHERE cnpj = '${empresa}'`, function(err, result){
            if(err){
                resultado({message: `Empresa não pode ser deletada' ${empresa}`}, null );
            }
            else{
                resultado(null, { message: `Deletada com sucesso' ${empresa}`});
            }
        })
    }


module.exports = empresaDAO;