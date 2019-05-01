const interesseDAO = require('../models/interesseDAO')

exports.listarInteresses = function (req, res) {
    interesseDAO.listarInteresses(function (err, result) {
        if (err)
            res.status(400).send(err);
        else
            res.status(200).send(result)
    });
};


exports.insertInteresses = function (req, res) {
    var interesse = req.body;
    console.log(req.body);

    interesseDAO.inserirInteresse(interesse)
    .then(() => res.json({message: 'Cadastrado com sucesso'}))
    .catch(err => {
        if(err.errno == 1062){
            return res.status(400).send({message: 'Não é possível cadastrar interesses iguais'});
        }
        else{
            return res.status(400).send({message: 'Ocorreu um erro ao cadastrar um interesse'});
        }
    })

}


exports.atualizarInteresse = function(req, res){
    var interesse = req.body;
    console.log(req.body);

    interesseDAO.atualizarInteresse(interesse)
    .then(() => res.json({message: 'Atualizado com sucesso'}))
    .catch(err => {
        if(err.errno == 1062){
            return res.status(400).send({message: 'Não é possível atualizar o interesse igual'});
        }
        else{
            return res.status(400).send({message: 'Ocorreu um erro ao atualizar um interesse'});
        }
    })
}
