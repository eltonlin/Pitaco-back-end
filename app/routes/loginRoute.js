const loginController = require('../controllers/login-controller.js');

module.exports = function(app){
    app.get('/login',  loginController.consultarLogin)
        
    
   
};