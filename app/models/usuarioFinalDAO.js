
var connection = require('../../config/dbConnection');
const enderecoDAO = require('./enderecoDao');

var usuarioFinalDAO = function (usuario_final) {
    this.login_usuario = usuario_final.login_usuario;
    this.senha = usuario_final.senha;
    this.nome = usuario_final.nome;
    this.cpf = usuario_final.cpf;
    this.faixa_salarial = usuario_final.faixa_salarial;
    this.data_nascimento = usuario_final.data_nascimento;
    this.pontuacao = usuario_final.pontuacao;
};

usuarioFinalDAO.inserirUsuario = function (usuario_final, result) {
    connection.query('INSERT into usuario_final set ?', usuario_final, function (err, res) {
        if (err) {
            console.log("error : ", err);
            result(err, null);
        }
        else {
            console.log("resultado: ", res);
            result(null, res);
        }
    });
};

usuarioFinalDAO.login = function (login_usuario, senha, result) {
    connection.query(`SELECT * FROM usuario_final WHERE login_usuario = '${login_usuario}' and senha = '${senha}' `, function (error, results, fields) {
        if (error) {
            result({ message: 'Erro ao efetuar o login, por favor verifique seu usuário e senha' }, null);
        }
        else if (results[0] == undefined || results[0] == null) {
            result({ message: 'Login ou senha inválido' }, null);
        }
        else if (results) {
            result(null, { message: 'Login efetuado com sucesso', usuario: results[0] });
        }
    });

}


usuarioFinalDAO.verificaLoginExistente = function (login_usuario, resultado) {
    console.log('está passando o usuário: ' + login_usuario);
    connection.query(`SELECT * FROM usuario_final where login_usuario = '${login_usuario}' `, function (error, result) {
        if (error) {
            console.log(error);
            resultado({ code: 400, message: 'Ocorreu um erro ao executar a função para buscar o login do usuario' });
        }
        else if (result[0] !== undefined) {
            console.log(result);
            resultado({ code: 400, message: 'Já existe um usuário cadastrado com esse login' });
        }
        else { 
            resultado({ code: 200 });
        }
    })
}

usuarioFinalDAO.retornaPontuacaoPorUsuario = function(login_usuario){
    return new Promise((resolve, reject) => { 
        connection.query(`SELECT PONTUACAO FROM USUARIO_FINAL where login_usuario = '${login_usuario}'`, function(error, result){
            if(error)
                reject();
            else
                resolve(result);
        })
    })
}

usuarioFinalDAO.retornaUsuarioPorLogin = function(login_usuario){
    return new Promise((resolve, reject) => {        
        connection.query(`SELECT * from usuario_final where login_usuario = '${login_usuario}'`, function(error, usuario_final){
            if(error){
                reject();
            } else {
                enderecoDAO.enderecoPorUsuario(login_usuario)
                .then(endereco => {     
                    usuario_final[0].endereco = endereco;  
                    console.log(usuario_final);                   
                    resolve(usuario_final);                 
                })
                .catch(() =>  reject()); 
            }                
        })
    })
}

usuarioFinalDAO.atualizarUsuarioFinal = function(usuario){
    console.log('No inicio');
    return new Promise((resolve,reject) => {
        console.log('Antes da conexão');
        connection.query(
            `UPDATE usuario_final set nome = '${usuario.nome}', cpf = '${usuario.cpf}' ,
            faixa_salarial = '${usuario.faixa_salarial}', senha = '${usuario.senha}', 
            data_nascimento = '${usuario.data_nascimento}' WHERE login_usuario = '${usuario.login_usuario}'`), function(err, resultadoUsuario){
                console.log('AQUI CHEGUEI');
                if(err){
                    console.log('deu erro');
                    reject();
                } else {
                    console.log('chegou aqui' + resultadoUsuario);
                    enderecoDAO.atualizaEnderecoPorUsuario(usuario.endereco)
                    .then(resultEndereco => {
                        console.log('Chega aqui no then');
                        console.log(resultEndereco);
                        resolve(resultEndereco);
                    })
                    .catch(() => reject());
                }
            }
    })
}

module.exports = usuarioFinalDAO;

