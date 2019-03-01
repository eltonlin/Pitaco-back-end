const empresaDao = require('../models/empresaDAO')

exports.todasEmpresas = function(req, res){
    empresaDao.listarEmpresas(function(err, empresa){
        console.log('controller')
        if (err)
        res.send(err);
        console.log('res', empresa);
        res.send(empresa);
    })    
}
