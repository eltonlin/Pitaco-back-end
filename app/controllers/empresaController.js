const empresaDao = require('../models/empresaDAO')

exports.consutarTodasEmpresas = function (req, res) {
    empresaDao.listarEmpresas(function (err, empresa) {
        if (err)
            return res.send(err);
        else
            return res.json(empresa);
    })
}

exports.inserirEmpresa = function (req, res) {
    console.log(req.body);
    var empresa = new empresaDao(req.body);

    if (!empresa.cnpj)
        return res.status(400).send({ message: 'O cnpj é obrigatório' });
    if (!empresa.nome_empresa)
        return res.status(400).send({ message: 'O nome da empresa é obrigatório' });
    if (!empresa.login_master)
        return res.status(400).send({ message: 'O login_master é obrigatório' });

    empresaDao.inserirEmpresa(empresa, function (err, result) {
        if (err)
            return res.status(400).send(err);
        else
            return res.status(200).json(result);
    });
}

exports.consultarEmpresaPorId = function (req, res) {
    var id_empresa = req.params.id_empresa;

    console.log(id_empresa);

    empresaDao.consultarEmpresaPorId(id_empresa, function (err, result) {
        if (err)
            return res.status(400).send(err);
        else
            return res.status(200).json(result);
    })
}
