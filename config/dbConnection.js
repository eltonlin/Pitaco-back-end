var mysql = require('mysql');

var db_config  = {
  connectionLimit: 10,
  host: "us-cdbr-iron-east-02.cleardb.net",
  user: "b6eee132bd6e57",
  password: "8d5cd05a",
  database: "heroku_6465061891bfc99"
};

var connection = mysql.createPool(db_config);


module.exports = connection;
