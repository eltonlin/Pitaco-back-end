
const usuarioFinalDAO = require('../models/usuarioFinalDAO')

    
exports.inserirUsuario = function(req, res) {
  console.log(req.body);
  var usuarioFinal = new usuarioFinalDAO(req.body);

  if(!usuarioFinal.login_usuario)
      res.status(400).send({error: true, message : 'Campo de usuário é obrigatório'});    
  if(!usuarioFinal.senha)
      res.status(400).send({error: true, message : 'Campo de senha é obrigatória'});       
  if(!usuarioFinal.nome)
      res.status(400).send({error: true, message : 'Campo de nome é obrigatório'}); 
  if(!usuarioFinal.faixa_salarial)
      res.status(400).send({error: true, message : 'Campo de faixa salarial é obrigatório'}); 
  if(!usuarioFinal.data_nascimento)
      res.status(400).send({error: true, message : 'Campo de data de nascimento é obrigatório'}); 
  if(usuarioFinal.pontuacao == null)
      usuarioFinal.pontuacao = 0;
  
  //validação de cpf
  var numeros, digitos, soma, i, resultado, digitos_iguais;
  digitos_iguais = 1;
  if (usuarioFinal.cpf.length < 11){
    res.status(400).send({error: true, message : 'O cpf não pode ter menos de 11 caracteres'}); 
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
        res.status(400).send({error: true, message : 'O cpf é inválido'}); 
        return;
    }
    numeros = usuarioFinal.cpf.substring(0,10);
    soma = 0;
    for (i = 11; i > 1; i--)
        soma += numeros.charAt(11 - i) * i;
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)){
        res.status(400).send({error: true, message : 'O cpf é inválido'});
        return;        
    }
  } else {
    res.status(400).send({error: true, message : 'O cpf é inválido'});   
    return;
  } 
    
  consultarLogin(usuarioFinal.login_usuario, usuarioFinal.senha)
  .then(result => {
    console.log(result);
      usuarioFinalDAO.inserirUsuario(usuarioFinal, function(err, result){
            if(err)
            res.send(err);
        res.status(200).json(result);
    })     
  })
  .catch(
      res.send({error : true, message: 'Erro ao efetuar o login, por favor verifique seu usuário e senha'})
    );
  
};

function consultarLogin(login_usuario, senha){
    return new Promise((resolve, reject) => {
        usuarioFinalDAO.consultarLogin(login_usuario, senha, function(result){        
            if(result.error == false){
                console.log('não retornou erro', result);
                resolve(result);
            }                
            else 
                reject(result);
    })
})
}