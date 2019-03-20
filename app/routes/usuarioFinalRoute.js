var usuarioFinalController = require('../controllers/usuarioFinalController');

module.exports = function(app){
    
        app.post('/usuario_final/login', usuarioFinalController.inserirUsuario)
        // app.post('/usuario_final/consultar_login', usuarioFinalController.consultarLogin);

        
      
};