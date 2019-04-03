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
            console.log(results[0]);
            result({ message: 'Login ou senha inválido' }, null);
        }
        else if (results) {
            result(null, { message: 'Login efetuado com sucesso' });
        }
    });

}

module.exports = usuarioMasterDAO;