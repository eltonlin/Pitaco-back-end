const usuarioFinalInteressesDAO = require('../models/usuarioFinalInteressesDAO');

exports.listarInteressesPorUsuario = function (req, res) {
    var usuario_final = req.params.usuario_final;

    usuarioFinalInteressesDAO.listarInteressesPorUsuario(usuario_final, function (err, result) {
        if(err)
            return res.send(err);
        else
            return res.send(result);
    });
}

exports.inserirInteressesPorUsuario = function (req, res) {
    var usuario_final_interesses = new usuarioFinalInteressesDAO(req.body);

    usuarioFinalInteressesDAO.inserirInteressesPorUsuario(usuario_final_interesses.usuario_final, usuario_final_interesses.interesses, function (err, resultado) {
        if(err)
            return res.status(400).send(err);
        else
            return res.status(200).send(resultado);
    })
}

exports.deletarInteressesPorUsuario = function (req, res) {
    
    var usuario_final = req.body.usuario_final;


    usuarioFinalInteressesDAO.deletarInteressesPorUsuario(usuario_final,function (err, resultado) {
        if(err)
            return res.status(400).send(err);
        else
            return res.send(resultado);
    });
}