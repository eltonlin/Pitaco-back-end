var empresaController = require('../controllers/empresaController.js');

module.exports = function (app) {
    app.get('/empresas', empresaController.consutarTodasEmpresas)
        .post('/empresas', empresaController.inserirEmpresa);

    app.get('/empresa/:cnpj', empresaController.consultarEmpresaPorCnpj);
    app.put('/empresas/atualizar', empresaController.atualizarEmpresa);
    app.put('/empresas/deletar', empresaController.deletarEmpresa);
    
};