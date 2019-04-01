const interesseDAO = require('../models/interesseDAO')

exports.listarInteresses = function(req, res){
    interesseDAO.listarInteresses(function(result){
        res.send(result);
    });
};


exports.insertInteresses = function(req, res){
    var interesse = req.body;
    console.log(JSON.parse(interesse));
    for(i= 0; i < interesse.lenght; i++){
        console.log(i.interesse);
    }
    
}