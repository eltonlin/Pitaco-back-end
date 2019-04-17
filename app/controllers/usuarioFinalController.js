
const usuarioFinalDAO = require('../models/usuarioFinalDAO')
const enderecoDAO = require('../models/enderecoDAO')


exports.inserirUsuario = function (req, res) {
  var usuarioFinal = new usuarioFinalDAO(req.body);
  var endereco = new enderecoDAO(req.body);

  if (!usuarioFinal.login_usuario)
    return res.status(401).send({  message: 'Campo de usuário é obrigatório' });
  if (!usuarioFinal.senha)
    return res.status(401).send({  message: 'Campo de senha é obrigatória' });
  if (!usuarioFinal.nome)
    return res.status(401).send({  message: 'Campo de nome é obrigatório' });
  if (!usuarioFinal.cpf) {
    return res.status(401).send({ message: "Campo cpf é obrigatório" });
  }
  if (!usuarioFinal.faixa_salarial)
    return res.status(401).send({  message: 'Campo de faixa salarial é obrigatório' });
  if (!usuarioFinal.data_nascimento)
    return res.status(401).send({  message: 'Campo de data de nascimento é obrigatório' });
  if (usuarioFinal.pontuacao == null)
    usuarioFinal.pontuacao = 0;
  if (endereco.rua == null)
    return res.status(401).send({  message: 'O campo rua é obrigatório' });
  if (endereco.cep == null)
    return res.status(401).send({  message: 'O campo cep é obrigatório' });
  if (endereco.bairro == null)
    return res.status(401).send({  message: 'O bairro é obrigatório' });
  if (endereco.cidade == null)
    return res.status(401).send({  message: 'A cidade é obrigatório' });
  if (endereco.estado == null)
    return res.status(401).send({  message: 'A cidade é obrigatório' });

  //validação de cpf
  var numeros, digitos, soma, i, resultado, digitos_iguais;
  digitos_iguais = 1;
  if (usuarioFinal.cpf.length < 11) {
    return res.status(401).send({  message: 'O cpf não pode ter menos de 11 caracteres' });
  }
  for (i = 0; i < usuarioFinal.cpf.length - 1; i++)
    if (usuarioFinal.cpf.charAt(i) != usuarioFinal.cpf.charAt(i + 1)) {
      digitos_iguais = 0;
      break;
    }
  if (!digitos_iguais) {
    numeros = usuarioFinal.cpf.substring(0, 9);
    digitos = usuarioFinal.cpf.substring(9);
    soma = 0;
    for (i = 10; i > 1; i--)
      soma += numeros.charAt(10 - i) * i;
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) {
      return res.status(401).send({  message: 'O cpf é inválido' });
    }
    numeros = usuarioFinal.cpf.substring(0, 10);
    soma = 0;
    for (i = 11; i > 1; i--)
      soma += numeros.charAt(11 - i) * i;
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) {
      return res.status(401).send({  message: 'O cpf é inválido' });

    }
  } else {
    return res.status(401).send({  message: 'O cpf é inválido' });
  }

  verificaLoginExistente(usuarioFinal.login_usuario)
    .then(() => {
      new Promise((resolve, reject) => {
        usuarioFinalDAO.inserirUsuario(usuarioFinal, function (err, result) {
          if (err)
            reject(err);
          resolve();
        })
      }).then(() => {
        enderecoDAO.inserirEndereco(endereco, function (result) {
          res.status(201).send(result);
        })
      }).catch(err => {
        res.status(400).send(err)
      });
    })
    .catch(err => res.status(400).send(err));
};


function verificaLoginExistente(login_usuario) {
  return new Promise((resolve, reject) => {
    usuarioFinalDAO.verificaLoginExistente(login_usuario, function (result) {
      if (result.code == 200) {
        resolve();
      }
      else {
        reject(result);
      }
    })
  })
}

exports.login = function (req, res) {
  const login_usuario = req.body.login_usuario;
  const senha = req.body.senha;

  if (!login_usuario) {
    return res.status(400).send({ message: 'O email é obrigatório' });
  }
  if (!senha) {
    return res.status(400).send({ message: 'A senha é obrigatória' });
  }
  usuarioFinalDAO.login(login_usuario, senha, function (err, sucess) {
    if (err)
      return res.status(401).send(err);
    else
      return res.status(200).json(sucess);
  });
}

exports.retornaPontuacaoPorUsuario = function(req, res) { 
  const login_usuario = req.params.usuario;

  if(!login_usuario){
    return res.status(400).send({ message: 'O login do usuário é obrigatório' })
  }

  usuarioFinalDAO.retornaPontuacaoPorUsuario(login_usuario)
  .then(result => res.json(result))
  .catch(() => res.status(400).send({message: 'Erro ao retornar a pontuação do usuário'}));
}

exports.retornaUsuarioPorLogin = function(req, res){
  const login_usuario = req.params.usuario; 
  
  if(!login_usuario){
    return res.status(400).send({ message: 'O login do usuário é obrigatório' })
  }

  usuarioFinalDAO.retornaUsuarioPorLogin(login_usuario)
  .then(result => res.json(result))
  .catch(() => res.status(400).send({message: 'Erro ao buscar o usuário'}));

}

exports.atualizarUsuarioFinal = function(req, res){
  usuario = req.body.usuario;
  usuarioFinalDAO.atualizarUsuarioFinal(usuario)
  .then(() => res.sendStatus(200))
  .catch(() => res.status(400).send({message: 'Erro ao atualizar as informações do usuário'}));

}