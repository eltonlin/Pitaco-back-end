
const loginDao = require('../models/loginDao')

exports.login=function(req,res){
    var usuario_final=req.body.usuario_final;
    var senha=req.body.senha;

}

exports.consultarLogin = function(req, res){
  var usuario_final = req.params.usuario_final;
  var senha = req.params.senha;
  loginDao.consultarLogin(usuario_final,senha, function(err, result){
      if(err)
          res.send(err);
      res.status(200).json(result);
  })
}
