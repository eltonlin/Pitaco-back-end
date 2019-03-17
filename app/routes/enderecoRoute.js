var enderecoController = require('../controllers/enderecoController.js');

module.exports = function(app){
    
        app.post('/endereco', enderecoController.inserirEndereco);
      
};