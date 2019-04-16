var connection = require('../../config/dbConnection');

var enderecoDAO = function (endereco) {
    this.rua = endereco.rua;
    this.complemento = endereco.complemento;
    this.bairro = endereco.bairro;
    this.cidade = endereco.cidade;
    this.cep = endereco.cep;
    this.estado = endereco.estado;
    this.login_usuario = endereco.login_usuario;

};

enderecoDAO.inserirEndereco = function (endereco, result) {
    connection.query('INSERT into endereco  set ?', endereco, function (err, res) {
        if (err) {
            result({ message: "Houve um erro para o cadastro do endereço" });
        }
        else {
            result({ message: "Cadastro do usuário realizado com sucesso!" });
        }
    });
};

enderecoDAO.enderecoPorUsuario = function(login_usuario) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ENDERECO WHERE LOGIN_USUARIO = '${login_usuario}'`, function(err, result){
            if(err){
                console.log(err);
                reject();
            }          
            else{
                console.log(result);
                resolve(result);          
            } 
        });
    })
}

enderecoDAO.atualizaEnderecoPorUsuario = function(endereco) {
    return new Promise((resolve, reject) => {
        connection.query(
            `UPDATE ENDERECO SET estado = '${endereco.estado}', cidade = '${endereco.cidade}',
            bairro = '${endereco.bairro}', rua = '${endereco.rua}', cep = '${endereco.cep}, complemento = '${endereco.complemento}' 
            WHERE login_usuario = '${endereco.login_usuario} `, function(err, result) {
                if(err){
                    reject();
                }
                else{
                    resolve();
                }
            });
    });
}

module.exports = enderecoDAO;