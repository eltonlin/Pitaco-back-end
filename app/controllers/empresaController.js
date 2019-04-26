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
    //var empresa = new empresaDao(req.body);
    var empresa = (req.body);
    console.log(req.body);

    if (!empresa.cnpj)
        return res.status(400).send({ message: 'O cnpj é obrigatório' });
    if (!empresa.nome_empresa)
        return res.status(400).send({ message: 'O nome da empresa é obrigatório' });
    //if (!empresa.login_master)
       // return res.status(400).send({ message: 'O login_master é obrigatório' });

    //empresaDao.inserirEmpresa(empresa, function (err, result) {
      //  if (err)
       //     return res.status(400).send(err);
       // else
      //      return res.status(200).json(result);
  //  });

        empresaDAO.inserirEmpresa(empresa, function (err, result) {
            if (err)
                res.status(400).send(err);
            else
                res.status(200).send(result)
        })
}

exports.consultarEmpresaPorId = function (req, res) {
    var id_empresa = req.params.id_empresa;


    empresaDao.consultarEmpresaPorId(id_empresa, function (err, result) {
        if (err)
            return res.status(400).send(err);
        else
            return res.status(200).json(result);
    })

    
}
