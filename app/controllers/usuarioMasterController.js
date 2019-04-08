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