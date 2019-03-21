
const usuarioFinalDAO = require('../models/usuarioFinalDAO')
const enderecoDAO = require('../models/enderecoDAO')

    
exports.inserirUsuario = function(req, res) {
  var usuarioFinal = new usuarioFinalDAO(req.body);
  var endereco = new enderecoDAO(req.body);
  console.log(usuarioFinal);
  console.log(endereco);

  if(!usuarioFinal.login_usuario)
      res.status(400).send({code: 400, message : 'Campo de usuário é obrigatório'});    
  if(!usuarioFinal.senha)
      res.status(400).send({code: 400, message : 'Campo de senha é obrigatória'});       
  if(!usuarioFinal.nome)
      res.status(400).send({code: 400, message : 'Campo de nome é obrigatório'}); 
  if(!usuarioFinal.faixa_salarial)
      res.status(400).send({code: 400, message : 'Campo de faixa salarial é obrigatório'}); 
  if(!usuarioFinal.data_nascimento)
      res.status(400).send({code: 400, message : 'Campo de data de nascimento é obrigatório'}); 
  if(usuarioFinal.pontuacao == null)
      usuarioFinal.pontuacao = 0;
  if(endereco.rua == null)
    res.status(400).send({code: 400, message : 'O campo rua é obrigatório'}); 
  if(endereco.cep == null)
    res.status(400).send({code: 400, message : 'O campo cep é obrigatório'});
  if(endereco.bairro == null)
    res.status(400).send({code: 400, message : 'O bairro é obrigatório'});
  if(endereco.cidade == null)
    res.status(400).send({code: 400, message : 'A cidade é obrigatório'});

  //validação de cpf
  var numeros, digitos, soma, i, resultado, digitos_iguais;
  digitos_iguais = 1;
  if (usuarioFinal.cpf.length < 11){
    res.status(400).send({code: 400, message : 'O cpf não pode ter menos de 11 caracteres'}); 
    return;
  }
  for (i = 0; i < usuarioFinal.cpf.length - 1; i++)
        if (usuarioFinal.cpf.charAt(i) != usuarioFinal.cpf.charAt(i + 1))
        {
            digitos_iguais = 0;
            break;
        }
  if (!digitos_iguais) {
    numeros = usuarioFinal.cpf.substring(0,9);
    digitos = usuarioFinal.cpf.substring(9);
    soma = 0;
    for (i = 10; i > 1; i--)
        soma += numeros.charAt(10 - i) * i;
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)){
        res.status(400).send({code: 400, message : 'O cpf é inválido'}); 
        return;
    }
    numeros = usuarioFinal.cpf.substring(0,10);
    soma = 0;
    for (i = 11; i > 1; i--)
        soma += numeros.charAt(11 - i) * i;
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)){
        res.status(400).send({code: 400, message : 'O cpf é inválido'});
        return;        
    }
  } else {
    res.status(400).send({code: 400, message : 'O cpf é inválido'});   
    return;
  } 
    
  verificaLoginExistente(usuarioFinal.login_usuario)
  .then(() => {
      new Promise((resolve, reject) => {
        usuarioFinalDAO.inserirUsuario(usuarioFinal, function(err, result){
            if(err)
                reject(err);             
            resolve();
      })
    }).then(() => { 
        enderecoDAO.inserirEndereco(endereco, function(err, result){
            if(err)
                res.send(err);
            console.log('Está passando aqui no endereço');   
            res.status(200).send(result);
        })
    }).catch(err => {
        console.log(err);
        res.send(err)});
  })
  .catch(err => res.send(err));  
};


function verificaLoginExistente(login_usuario){
    return new Promise((resolve,reject) => {
        usuarioFinalDAO.verificaLoginExistente(login_usuario, function(result){
            if(result.code == 200){
                resolve();
            }
            else { 
                reject(result);
            }
        })
    })
}

exports.login = function(req, res){  
    const login_usuario = req.body.login_usuario;
    const senha = req.body.senha;  
    usuarioFinalDAO.login(login_usuario, senha, function(result){        
        res.send(result);
    });
}