const express = require('express');
const routes = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');




routes.get('/',homeController.index);

//Rotas de controle
routes.get('/login/index',loginController.login);
routes.post('/login/register', loginController.register);
routes.post('/login/login', loginController.loginUser);
routes.get('/login/logout', loginController.loginOut);


//Rotas de contato
routes.get('/contato/cadastro', contatoController.contatoCadastro);
routes.post('/contato/register', contatoController.contatoRegister);
routes.get('/contato/cadastro/:id' , contatoController.registerEdit)
routes.post('/contato/edit/:id' , contatoController.edit)
routes.get('/contato/delete/:id' , contatoController.contatoDelete)




module.exports = routes;
