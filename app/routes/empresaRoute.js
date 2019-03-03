var empresaController = require('../controllers/empresaController.js');

module.exports = function(app){
    app.get('/empresas',  empresaController.consutarTodasEmpresas)
        .post('/empresas', empresaController.inserirEmpresa);
    
    app.get('/empresa/:id_empresa', empresaController.consultarEmpresaPorId);
};