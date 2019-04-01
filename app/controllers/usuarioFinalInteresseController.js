const usuarioFinalInteressesDAO = require('../models/usuarioFinalInteressesDAO');

exports.listarInteressesPorUsuario = function(req, res){
    var usuario_final = req.params.usuario_final;

    usuarioFinalInteressesDAO.listarInteressesPorUsuario(usuario_final, function(result){
        res.send(result);
    });
}

exports.inserirInteressesPorUsuario = function(req, res){
    var usuario_final_interesses = new usuarioFinalInteressesDAO(req.body);

    usuarioFinalInteressesDAO.inserirInteressesPorUsuario(usuario_final_interesses.usuario_final, usuario_final_interesses.interesses, function(resultado){
        res.send(resultado);
    })
}