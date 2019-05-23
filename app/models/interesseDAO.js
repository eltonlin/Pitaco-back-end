var connection = require('../../config/dbConnection');

var interesseDAO = function (interesse) {
    this.descricao = interesse.descricao;
}


interesseDAO.listarInteresses = function (result) {
    connection.query('SELECT * FROM interesse', function (error, resultado) {
        if (error)
            result({ message: "Houve um erro ao buscar os interesses" }, null);
        else
            result(null, resultado);
    })
};

interesseDAO.inserirInteresse = function (interesse) {
    return new Promise((resolve ,reject ) => {
        connection.query('INSERT INTO INTERESSE SET ?', interesse, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    })
}

interesseDAO.atualizarInteresse = function(interesse){
    return new Promise((resolve ,reject ) => {
        connection.query( `UPDATE interesse set descricao = '${interesse.descricao}'
            WHERE id_interesse = '${interesse.id_interesse}'`, function(err, resultadoInteresse){
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        })
    }

    interesseDAO.deletarInteresse = function(interesse, resultado){
        connection.query(`DELETE FROM INTERESSE WHERE id_interesse = '${interesse}'`, function(err, result){
            if(err){
                resultado({message: `O interesse está em uso por isso não pode ser deletado`}, null );
            }
            else{
                resultado(null, { message: `Deletado com sucesso' ${interesse}`});
            }
        })
    }

 





module.exports = interesseDAO;



