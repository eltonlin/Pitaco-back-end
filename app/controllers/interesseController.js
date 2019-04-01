const interesseDAO = require('../models/interesseDAO')

exports.listarInteresses = function(req, res){
    interesseDAO.listarInteresses(function(result){
        res.send(result);
    });
};


exports.insertInteresses = function(req, res){
   var interesse = req.body;

   interesseDAO.inserirInteresse(interesse, function(result){
       res.send(result);
   })
    

}