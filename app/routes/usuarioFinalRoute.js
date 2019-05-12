var usuarioFinalController = require('../controllers/usuarioFinalController');

module.exports = function (app) {

        app.post('/usuario_final/cadastrar_login', usuarioFinalController.inserirUsuario)
        app.post('/usuario_final/login', usuarioFinalController.login);
        app.get('/usuario_final/:usuario/pontuacao', usuarioFinalController.retornaPontuacaoPorUsuario)
        app.get('/usuario_final/:usuario', usuarioFinalController.retornaUsuarioPorLogin)
        app.put('/usuario_final/atualizar', usuarioFinalController.atualizarUsuarioFinal)
        app.get('/usuario_final', usuarioFinalController.retonarUsuarios)
        app.put('/usuario_final/atualizar_pontuacao', usuarioFinalController.atualizaPontuacao)

};