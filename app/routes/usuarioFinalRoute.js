var usuarioFinalController = require('../controllers/usuarioFinalController');

module.exports = function (app) {

        app.post('/usuario_final/cadastrar_login', usuarioFinalController.inserirUsuario)
        app.post('/usuario_final/login', usuarioFinalController.login);
        app.get('/usuario_final/:usuario/pontuacao', usuarioFinalController.retornaPontuacaoPorUsuario)
        app.get('/usuario_final/:usuario', usuarioFinalController.retornaUsuarioPorLogin)
        app.patch('/usuario_final/atualizar', usuarioFinalController.atualizarUsuarioFinal)

};