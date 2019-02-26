var empresaDAO = require('../models/empresaDAO');

module.exports = function(app){
    app.get('/empresas', empresaDAO.listarEmpresas);
};