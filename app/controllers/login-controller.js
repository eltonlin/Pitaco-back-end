
const loginDao = require('../models/loginDao')

exports.login=function(req,res){
    var login_final=req.body.login_final;
    var senha=req.body.senha;

}

exports.consultarLogin = function(req, res){
  var login_final = req.params.login_final;
  var senha = req.params.senha;
  loginDao.consultarLogin(login_final,senha, function(err, result){
      if(err)
          res.send(err);
      res.status(200).json(result);
  })
}
