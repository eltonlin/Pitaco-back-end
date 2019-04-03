const usuarioFinalInteressesController = require('../controllers/usuarioFinalInteresseController');


module.exports = function (app) {
    app.get('/usuario_final_interesses/:usuario_final', usuarioFinalInteressesController.listarInteressesPorUsuario)
        .post('/usuario_final_interesses/cadastrar', usuarioFinalInteressesController.inserirInteressesPorUsuario)
}