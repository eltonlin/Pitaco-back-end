const usuarioMasterDAO = require('../models/usuarioMasterDAO');


exports.loginUsuarioMaster = function (req, res) {
    const login_master = req.body.login_master;
    const senha = req.body.senha;
    usuarioMasterDAO.loginUsuarioMaster(login_master, senha, function (err, result) {
        if(err)
            return res.status(400).send(err);
        else
            return res.status(200).send(result);
    });
}

exports.cadastrarUsuarioMaster = function(req, res) {
    const usuarioMaster = new usuarioMasterDAO(req.body);

    usuarioMasterDAO.cadastrarUsuarioMaster(usuarioMaster)
    .then(() => res.json({message: 'Usuário Master cadastrado com sucesso!'}))
    .catch(() => res.status(400).send({message: 'Erro ao cadastrar o usuário Master'}));
}