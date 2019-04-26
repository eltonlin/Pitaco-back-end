const interesseController = require('../controllers/interesseController');

module.exports = function (app) {
    app.get('/interesses', interesseController.listarInteresses);
    app.post('/interesse_usuario/cadastrar', interesseController.insertInteresses);
    app.post('/interesses/deletar', interesseController.deletarInteresses);
    app.put('interesses/atualizar', interesseController.atualizarInteresses);

}