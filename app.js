// ZingmarkVape backend created by Zingmark 2022

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

// Creating an instance of the items route
var itemsRouter = require('./routes/items');

// Creating an instance of our application
var app = express();

// App port
const SERVER_PORT = 8000;

// Set view engine and send our page to the clients
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'views')));

app.use(express.static(path.join(__dirname, '/public/')));

app.get('/', (req, res) => {
    res.render(`${__dirname}/views/index`);                 // Send our index along the root route  
});

// Listening to the api route
app.use('/api', itemsRouter);

// Start server listening
app.listen(SERVER_PORT, function() { 
    console.log('[APP] App start listening at port: ' + SERVER_PORT); 
});
