// Zingmark Salt Node.js backend created by Zingmark

// Include additional libraries
var express = require('express');
var mysql = require('mysql');

// Creating an instance of the router
var router = express.Router();

// Creating an instance of the JSON Parser
var jsonParser = express.json();

// Listening to the route
router.get('/items/get', jsonParser, function(req, res) { 
    sqlCon.query(`SELECT * FROM items`, function(error, result) {   // Requesting a complete list of items from MySQL
        resStringified = JSON.stringify(result);
        res.send(resStringified);                                   // Send the received data to the client
        if (error) {
            console.log('[MySQL] Query error.')
        }
    });
});

module.exports = router;