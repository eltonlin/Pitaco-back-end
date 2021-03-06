var connection = require('../../config/dbConnection');

var usuarioFinalInteressesDAO = function (usuarioFinalInteresseDAO) {
    this.usuario_final = usuarioFinalInteresseDAO.usuario_final;
    this.interesses = usuarioFinalInteresseDAO.interesses;
}

usuarioFinalInteressesDAO.listarInteressesPorUsuario = function (usuario_final, resultado) {
    connection.query(`select * from interesse where id_interesse IN (select id_interesse from usuario_final_interesse where login_usuario = '${usuario_final}');`, function (err, result) {
        if (err) {
            resultado({ message: `Houve um erro ao buscar os interesses do usuário ${usuario_final}` }, null);
        }
        else {
            resultado(null, result);
        }
    })
}

usuarioFinalInteressesDAO.inserirInteressesPorUsuario = function (usuario_final, interesses, resultado) {
    var records = [];

    for (i = 0; i < interesses.length; i++) {
        records[i] = [usuario_final, interesses[i]];
    }
    connection.query(`INSERT INTO USUARIO_FINAL_INTERESSE VALUES ? `, [records], function (err, res) {
        if (err) {
            resultado({ message: `Ocorreu um erro ao cadastrar os intereses do usuário ${usuario_final}` }, null );
        } else {
            resultado(null, { message: `Interesses do usuário ${usuario_final} foram cadastrados com sucesso` });
        }

    })
}

usuarioFinalInteressesDAO.deletarInteressesPorUsuario = function(usuario_final, resultado){
    connection.query(`DELETE FROM USUARIO_FINAL_INTERESSE WHERE login_usuario = '${usuario_final}'`, function(err, result){
        if(err){
            resultado({message: `Ocorreu um erro ao deletar os interesses do usuário ${usuario_final}`}, null );
        }
        else{
            resultado(null, { message: `Deletado os interesses do usuário ${usuario_final}`});
        }
    })
}

module.exports = usuarioFinalInteressesDAO;