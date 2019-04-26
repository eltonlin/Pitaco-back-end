var connection = require('../../config/dbConnection');

var empresaDAO = function (empresa) {
    this.nome_empresa = empresa.nome_empresa;
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


empresaDAO.consultarEmpresaPorId = function (id_empresa, result) {
    connection.query('select * from empresa where id_empresa = ?', id_empresa, function (err, res) {
        if (err)
            result(err, null);
        else result(null, res);
    });
};

empresaDAO.inserirEmpresa = function (empresa, resultado) {
    connection.query('INSERT into EMPRESA set ?', empresa, function (err, res) {
        if (err) {
            resultado({ mesage: ` Ocorreu um erro ao inserir a empresa ${empresa.nome_empresa}` }, null);
        }
        if (err) {
            resultado({ mesage: ` Ocorreu um erro ao inserir a empresa ${empresa.cnpj}` }, null);
        }
        resultado(null, { message: `A empresa ${empresa.nome_empresa} foi cadastrada com sucesso` });
        resultado(null, { message: `A empresa ${empresa.cnpj} foi cadastrada com sucesso` });
    })

}
    




module.exports = empresaDAO;