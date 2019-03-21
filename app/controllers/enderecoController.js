const enderecoDao = require('../models/enderecoDao')

    
    exports.inserirEndereco = function(req, res) {
      console.log(req.body);
      var cadEndereco = new enderecoDao(req.body);
  
      if(!cadEndereco.rua)
          res.status(400).send({code: 400, message : 'Campo de usuário é obrigatório'});    
      if(!cadEndereco.complemento)
          res.status(400).send({code: 400, message : 'Campo de senha é obrigatória'});       
      if(!cadEndereco.bairro)
          res.status(400).send({code: 400, message : 'Campo de nome é obrigatório'}); 
          if(!cadEndereco.cidade)
          res.status(400).send({code: 400, message : 'Campo de faixa salarial é obrigatório'}); 
          if(!cadEndereco.cep)
          res.status(400).send({code: 400, message : 'Campo de data de nascimento é obrigatório'}); 
        
      
          enderecoDao.inserirEndereco(cadEndereco, function(err, result){
          if(err)
              res.send(err);
          res.status(200).json(result);
      })
    };