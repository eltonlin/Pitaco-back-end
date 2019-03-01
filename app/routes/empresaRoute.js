var empresaController = require('../controllers/empresa.js');

module.exports = function(app){
    app.get('/empresas',  empresaController.todasEmpresas);
};