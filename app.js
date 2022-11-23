// Zingmark Salt Node.js backend created by Zingmark

// Include additional libraries
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var mysql = require('mysql');

// Include classes
var config = require('./config/mysql.config');
global.sqlCon = config.sqlCon;

require('./controllers');
require('./services');
require('./routes');

var itemsRouter = require('./routes/items');

var app = express();

// Server port
const SERVER_PORT = 8000;

// Set view engine and send our page to the clients
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, '/public/')));
app.get('/', (req, res) => {
    res.render(`${__dirname}/views/index`);
});

// Use items route
app.use('/api', itemsRouter);

// Start server listening
app.listen(SERVER_PORT, function() { 
    console.log('[APP] App start listening at port: ' + SERVER_PORT); 
});
