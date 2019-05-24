var connection = require('../../config/dbConnection');

var usuarioMasterDAO = function (usuario_master) {
    this.login_master = usuario_master.login_master;
    this.senha = usuario_master.senha;
    this.nome = usuario_master.nome;
}


usuarioMasterDAO.loginUsuarioMaster = function (login_master, senha, result) {
    connection.query(`SELECT * FROM usuario_master WHERE login_master = '${login_master}' and senha = '${senha}' `, function (error, results, fields) {
        if (error) {
            result({ message: 'Erro ao efetuar o login, por favor verifique seu usuário e senha' }, null);
        }
        else if (results[0] == undefined) {
            result({ message: 'Login ou senha inválido' }, null);
        }
        else if (results) {
            result(null, results[0]);
        }
    });

}


usuarioMasterDAO.cadastrarUsuarioMaster = function(usuarioMaster) {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO USUARIO_MASTER SET ?', usuarioMaster, function(err, result) {
            if(err){
                reject();
            }
            else
            {
                resolve();
            }
        })
    })
}

module.exports = usuarioMasterDAO;