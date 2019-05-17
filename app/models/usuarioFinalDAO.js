var connection = require("../../config/dbConnection");
const enderecoDAO = require("./enderecoDAO");

var usuarioFinalDAO = function(usuario_final) {
  this.login_usuario = usuario_final.login_usuario;
  this.senha = usuario_final.senha;
  this.nome = usuario_final.nome;
  this.cpf = usuario_final.cpf;
  this.faixa_salarial = usuario_final.faixa_salarial;
  this.data_nascimento = usuario_final.data_nascimento;
  this.pontuacao = usuario_final.pontuacao;
};

usuarioFinalDAO.inserirUsuario = function(usuario_final, result) {
  connection.query("INSERT into usuario_final set ?", usuario_final, function(
    err,
    res
  ) {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

usuarioFinalDAO.login = function(login_usuario, senha, result) {
  connection.query(
    `SELECT * FROM usuario_final WHERE login_usuario = '${login_usuario}' and senha = '${senha}' `,
    function(error, results, fields) {
      if (error) {
        result(
          {
            message:
              "Erro ao efetuar o login, por favor verifique seu usuário e senha"
          },
          null
        );
      } else if (results[0] == undefined || results[0] == null) {
        result({ message: "Login ou senha inválido" }, null);
      } else if (results) {
        result(null, {
          message: "Login efetuado com sucesso",
          usuario: results[0]
        });
      }
    }
  );
};

usuarioFinalDAO.verificaLoginExistente = function(login_usuario, resultado) {
  connection.query(
    `SELECT * FROM usuario_final where login_usuario = '${login_usuario}' `,
    function(error, result) {
      if (error) {
        resultado({
          code: 400,
          message:
            "Ocorreu um erro ao executar a função para buscar o login do usuario"
        });
      } else if (result[0] !== undefined) {
        resultado({
          code: 400,
          message: "Já existe um usuário cadastrado com esse login"
        });
      } else {
        resultado({ code: 200 });
      }
    }
  );
};

usuarioFinalDAO.retornaPontuacaoPorUsuario = function(login_usuario) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT PONTUACAO FROM USUARIO_FINAL where login_usuario = '${login_usuario}'`,
      function(error, result) {
        if (error) reject();
        else resolve(result);
      }
    );
  });
};

usuarioFinalDAO.retornaUsuarioPorLogin = function(login_usuario) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT login_usuario, senha, nome, cpf, faixa_salarial, pontuacao, DATE_FORMAT(data_nascimento, '%Y-%m-%d') data_nascimento from usuario_final where login_usuario = '${login_usuario}'`,
      function(error, usuario_final) {
        if (error) {
          reject();
        } else {
          enderecoDAO
            .enderecoPorUsuario(login_usuario)
            .then(endereco => {
              usuario_final[0].endereco = endereco;
              resolve(usuario_final[0]);
            })
            .catch(() => reject());
        }
      }
    );
  });
};

usuarioFinalDAO.atualizarUsuarioFinal = function(usuario) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE usuario_final set nome = '${usuario.nome}', cpf = '${
        usuario.cpf
      }' ,
            faixa_salarial = '${usuario.faixa_salarial}', 
            data_nascimento = '${
              usuario.data_nascimento
            }' WHERE login_usuario = '${usuario.login_usuario}'`,
      function(err, resultadoUsuario) {
        if (err) {
          console.log(err);
          reject();
        } else {
          usuario.endereco.login_usuario = usuario.login_usuario;
          enderecoDAO
            .atualizaEnderecoPorUsuario(usuario.endereco)
            .then(() => {
              resolve();
            })
            .catch(() => reject());
        }
      }
    );
  });
};

usuarioFinalDAO.retornarUsuarios = function(){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT login_usuario, cpf, nome, faixa_salarial, pontuacao, DATE_FORMAT(data_nascimento, '%d/%m/%Y') data_nascimento from usuario_final`, function(err, result){
            if(err)
                reject();
            resolve(result);
        });
    })
}

usuarioFinalDAO.atualizaPontuacao = function(usuario){
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE usuario_final set pontuacao = ${usuario.pontuacao} WHERE login_usuario = '${usuario.login_usuario}' `, function(err, result){
            if(err)
                reject();
            resolve(result);
        })
    })
}

module.exports = usuarioFinalDAO;
