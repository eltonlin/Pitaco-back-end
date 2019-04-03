var usuarioFinalController = require('../controllers/usuarioFinalController');

module.exports = function (app) {

        app.post('/usuario_final/cadastrar_login', usuarioFinalController.inserirUsuario)
        app.post('/usuario_final/login', usuarioFinalController.login);

};