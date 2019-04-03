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

    interesseDAO.inserirInteresse(interesse, function (err, result) {
        if (err)
            res.status(400).send(err);
        else
            res.status(200).send(result)
    })


}