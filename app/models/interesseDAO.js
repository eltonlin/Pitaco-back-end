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

interesseDAO.inserirInteresse = function (interesse, resultado) {
    connection.query('INSERT INTO INTERESSE SET ?', interesse, function (err, result) {
        if (err) {
            resultado({ mesage: ` Ocorreu um erro ao inserir o interesse ${interesse.descricao}` }, null);
        }
        resultado(null, { message: `O interesse ${interesse.descricao} foi cadastro com sucesso` });
    })
}

//Atualizar Interesses
interesseDAO.atualizarInteresse = function(interesse) {
    return new Promise((resolve, reject) => {
        console.log(interesse);
        connection.query(
            `UPDATE INTERESSE SET descricao = '${interesse.descricao}', 
            WHERE id_interesse = '${interesse.id_interesse}' `, function(err, result) {
                if(err){     
                    console.log(err);
                    reject();
                }
                else{
                    console.log(result);
                    resolve();
                }
            });
    });
}

//Deletar Interesse
    interesseDAO.deletarInteresses = function(interesse, resultado){
        connection.query(`DELETE FROM INTERESSE WHERE id_interesse = '${interesse}'`, function(err, result){
            if(err){
                resultado({message: `Ocorreu um erro ao deletar os interesses  ${interesse}`}, null );
            }
            else{
                resultado(null, { message: `Interesse deletado com sucesso ${interesse}`});
            }
        })
    }

module.exports = interesseDAO;



