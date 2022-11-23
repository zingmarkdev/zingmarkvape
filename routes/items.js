// Zingmark Salt Node.js backend created by Zingmark

// Include additional libraries
var express = require('express');
var mysql = require('mysql');

var router = express.Router();

// Parse request and send response data from MySQL
var jsonParser = express.json();

router.get('/items/get', jsonParser, function(req, res) { 
    sqlCon.query(`SELECT * FROM items`, function(error, result) {
        resStringified = JSON.stringify(result);
        res.send(resStringified);
        if (error) {
            console.log('[MySQL] Query error.')
        }
        else {
            console.log('[MySQL] Client received response.');
        }
    });
});

module.exports = router;