const enderecoDao = require('../models/enderecoDAO')


exports.inserirEndereco = function (req, res) {
    var cadEndereco = new enderecoDao(req.body);

    if (!cadEndereco.rua)
        return res.status(400).send({ message: 'Campo de usuário é obrigatório' });
    if (!cadEndereco.complemento)
        return res.status(400).send({ message: 'Campo de senha é obrigatória' });
    if (!cadEndereco.bairro)
        return res.status(400).send({ message: 'Campo de nome é obrigatório' });
    if (!cadEndereco.cidade)
        return res.status(400).send({ message: 'Campo de faixa salarial é obrigatório' });
    if (!cadEndereco.cep)
        return res.status(400).send({ message: 'Campo de data de nascimento é obrigatório' });


    enderecoDao.inserirEndereco(cadEndereco, function (err, result) {
        if (err)
            return res.status(400).send(err);
        else
            return res.status(200).json(result);
    });
};