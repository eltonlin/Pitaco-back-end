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
    var empresa = new empresaDao(req.body);

    if (!empresa.cnpj)
        return res.status(400).send({ message: 'O cnpj é obrigatório' });
    if (!empresa.razao_social)
        return res.status(400).send({ message: 'A razão social da empresa é obrigatória' });
    if (!empresa.nome_fantasia)
        return res.status(400).send({ message: 'O nome fantasia é obrigatório' });
    if (!empresa.login_master)
        return res.status(400).send({ message: 'O login_master é obrigatório' });


    if (empresa.cnpj == '') return false;

    if (empresa.cnpj.length != 14)
        return res.status(400).send({ message: 'O Cnpj tem que ter 14 caracteres' });

    // Elimina CNPJs invalidos conhecidos
    if (empresa.cnpj == "00000000000000" ||
        empresa.cnpj == "11111111111111" ||
        empresa.cnpj == "22222222222222" ||
        empresa.cnpj == "33333333333333" ||
        empresa.cnpj == "44444444444444" ||
        empresa.cnpj == "55555555555555" ||
        empresa.cnpj == "66666666666666" ||
        empresa.cnpj == "77777777777777" ||
        empresa.cnpj == "88888888888888" ||
        empresa.cnpj == "99999999999999")
        return false;

    // Valida DVs
    tamanho = empresa.cnpj.length - 2
    numeros = empresa.cnpj.substring(0, tamanho);
    digitos = empresa.cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return res.status(400).send({ message: 'O Cnpj inválido' });

    tamanho = tamanho + 1;
    numeros = empresa.cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return res.status(400).send({ message: 'O Cnpj inválido' });

    empresaDao.verificarCnpj(empresa.cnpj)
        .then(() => {
            empresaDao.verificarRazaoSocial(empresa.razao_social)
                .then(() => {
                    empresaDao.inserirEmpresa(empresa, function (err, result) {
                        if (err)
                            return res.status(400).send({ message: 'Erro no cadastro da empresa' });
                        else
                            return res.status(200).json(result);
                    })

                })
                .catch(() => res.status(400).send({ message: 'A razão social já foi cadastrada.' }));
        })
        .catch(() => res.status(400).send({ message: 'Este cnpj já foi cadastrado por outra empresa' }));

}

exports.consultarEmpresaPorCnpj = function (req, res) {
    var empresa_cnpj = req.params.cnpj;

    empresaDao.consultarEmpresaPorCnpj(empresa_cnpj, function (err, result) {
        if (err)
            return res.status(400).send(err);
        else
            return res.status(200).json(result);
    })
}

exports.atualizarEmpresa = function(req, res){
    var empresa = req.body;
    console.log(req.body);

    empresaDao.atualizarEmpresa(empresa)
    .then(() => res.json({message: 'Atualizado com sucesso'}))
    .catch(err => {
        if(err.errno == 1062){
            return res.status(400).send({message: 'Não é possível atualizar a empresa igual'});
        }
        else{
            return res.status(400).send({message: 'Ocorreu um erro ao atualizar a empresa'});
        }
    })
}

exports.deletarEmpresa = function (req, res) {
    
    var empresa = req.body.cnpj;
    console.log(req.body);


    empresaDao.deletarEmpresa(empresa,function (err, resultado) {
        if(err)
            return res.status(400).send(err);
        else
            return res.send(resultado);
    });
}

