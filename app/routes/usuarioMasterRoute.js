const usuarioMasterController = require('../controllers/usuarioMasterController');


module.exports = function(app){
    app.post('/usuario_master/login', usuarioMasterController.loginUsuarioMaster);
} 