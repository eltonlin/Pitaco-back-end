var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "us-cdbr-iron-east-02.cleardb.net",
  user: "badc03f739055a",
  password: "dfbaa439",
  database: "heroku_259349f41df4d5d"
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;
