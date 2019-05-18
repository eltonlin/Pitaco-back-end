var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "us-cdbr-iron-east-02.cleardb.net",
  user: "b6eee132bd6e57",
  password: "8d5cd05a",
  database: "heroku_6465061891bfc99"
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;
