var cadastroLoginController = require('../controllers/cadastroLogin-controller.js');

module.exports = function (app) {

        app.post('/usuario_final/login', cadastroLoginController.inserirUsuario);

};