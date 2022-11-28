// ZingmarkVape backend created by Zingmark 2022

// Include MySQL library
var mysql = require('mysql');

// Connect to the MySQL Database
sqlCon.connect((err) => {
    if(err) console.log('[MySQL] Unable to connect to the database. See the configuration of MySQL connection.');
    else console.log('[MySQL] Successful connection to the database.');
});
