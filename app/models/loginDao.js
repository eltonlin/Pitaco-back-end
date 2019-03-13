var connection = require('../../config/dbConnection');


var loginDAO = function(login){
    this.usuario_final = login.usuario_final;
    this.senha = login.senha;
    
} ;

loginDAO.consultarLogin = function(result){  
connection.query('SELECT * FROM usuario_final WHERE usuario_final = ?',[usuario_final], function (error, results, fields) {
    if (error) {
        res.json({
          status:false,
          message:'Há erros na query'
          })
    }else{
      if(results.length >0){
          if(senha==results[0].senha){
              res.json({
                  status:true,
                  message:'Login com Sucesso'
              })
          }else{
              res.json({
                status:false,
                message:"Usuário e Senha não coincidem"
               });
          }
       
      }
      else{
        res.json({
            status:false,    
          message:"Usuário não existe"
        });
      }
    }
  });

}
module.exports = loginDAO;

