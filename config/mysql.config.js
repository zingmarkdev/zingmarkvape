// Zingmark Salt Node.js backend created by Zingmark

// Include MySQL library
var mysql = require('mysql');

// MySQL Connection
var sqlCon = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "zingmarksaltdb"
});

module.exports.sqlCon = sqlCon;