var express = require("express");

/* importar o módulo do consign */
var consign = require("consign");

var cors = require("cors");

/* importar o módulo do body-parser */
var bodyParser = require("body-parser");

/* importar o módulo do express-validator */
// var expressValidator = require('express-validator');

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
//app.set('view engine', 'ejs');
//app.set('views', './app/views');
app.use(cors());
/* configurar o middleware express.static */
app.use(express.static("./app/public"));

app.options('*', cors());

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

/* configurar o middleware express-validator */
// app.use(expressValidator());

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
  .include("app/routes")
  .into(app);

/* exportar o objeto app */
module.exports = app;
