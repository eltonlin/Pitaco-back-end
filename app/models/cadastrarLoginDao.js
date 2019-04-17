var connection = require('../../config/dbConnection');

var cadastrarLoginDao = function (usuario_final) {
    this.login_usuario = usuario_final.login_usuario;
    this.senha = usuario_final.senha;
    this.nome = usuario_final.nome;
    this.cpf = usuario_final.cpf;
    this.faixa_salarial = usuario_final.faixa_salarial;
    this.data_nascimento = usuario_final.data_nascimento;
    this.pontuacao = usuario_final.pontuacao;
};

cadastrarLoginDao.inserirUsuario = function (usuario_final, result) {
    connection.query('INSERT into usuario_final set ?', usuario_final, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = cadastrarLoginDao;