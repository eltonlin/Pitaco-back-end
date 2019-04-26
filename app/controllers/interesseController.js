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

    interesseDAO.inserirInteresse(interesse, function (err, result) {
        if (err)
            res.status(400).send(err);
        else
            res.status(200).send(result)
    })


}
exports.atualizarInteresse = function (req, res) {
    
     interesse = req.body.interesse;

     if (!interesse.descricao)
     return res.status(401).send({  message: 'Insira um novo interesse' });

      interesseDAO.atualizarInteresse(interesse,function (err, resultado) {
     
  if(err)
            return res.status(400).send({message: 'atualizado com sucesso'});
        else
            return res.send({message: 'Erro ao atualizar interesse'});
    });
}


exports.deletarInteresses = function (req, res) {
    var interesse = req.body.interesse;

    interesseDAO.deletarInteresses(interesse,function (err, resultado) {
        if(err)
            return res.status(400).send(err);
        else
            return res.send(resultado);
    });


}