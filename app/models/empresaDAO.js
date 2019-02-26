var dbConnection = require('../../config/dbConnection');

var conection = dbConnection();

api = {} 

api.listarEmpresas = function(){
    conection.query('select * from empresas;', function(err, res){
        console.log(res);
    })
}


module.exports = api;