
const cadastrarLoginDao = require('../models/cadastrarLoginDao')

    
    exports.inserirUsuario = function(req, res) {
      console.log(req.body);
      var cadastrarLogin = new cadastrarLoginDao(req.body);
  
      if(!cadastrarLogin.login_final)
          res.status(400).send({error: true, message : 'Campo de usuário é obrigatório'});    
      if(!cadastrarLogin.senha)
          res.status(400).send({error: true, message : 'Campo de senha é obrigatória'});       
      if(!cadastrarLogin.nome)
          res.status(400).send({error: true, message : 'Campo de nome é obrigatório'}); 
          if(!cadastrarLogin.faixa_salarial)
          res.status(400).send({error: true, message : 'Campo de faixa salarial é obrigatório'}); 
        
      
          cadastrarLoginDao.inserirUsuario(cadastrarLogin, function(err, result){
          if(err)
              res.send(err);
          res.status(200).json(result);
      })
    };
    