
const loginDao = require('../models/loginDao')

exports.login=function(req,res){
    var login_usuario=req.body.login_usuario;
    var senha=req.body.senha;

}

exports.consultarLogin = function(req, res){
  var login_usuario = req.params.login_usuario;
  var senha = req.params.senha;
  loginDao.consultarLogin(login_usuario,senha, function(err, result){
      if(err)
          res.send(err);
      res.status(200).json(result);
  })
}
