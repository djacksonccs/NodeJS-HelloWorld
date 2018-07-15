// Load the DB
require('./db/mongoose');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const todoController = require('./apiControllers/TodoController');
const userController = require('./apiControllers/UserController');

var app = express();
var port = 3030;

// Middleware
app.use((req, res, next) => { logIncomingRequest(req, res, next) });  // Server Log Middleware
app.use(bodyParser.json());  // Body Parser Middleware
app.use((req, res, next) => {  // Set content type globally to application/json middleware
    res.header('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// All Routes
// Todos Routes
app.get('/todos/', (req, res) => { todoController.get(req, res); });
app.get('/todos/:userId', (req, res) => { todoController.getWithUserId(req, res) });
app.get('/todos/:userId/:id', (req, res) => { todoController.getWithUserIdAndId(req, res) });
app.post('/todos/', (req, res) => { todoController.post(req, res) });
app.patch('/todos/:userId/:id', (req, res) => { todoController.patchWithIds(req, res) });
app.delete('/todos/:userId/:id', (req, res) => { todoController.deleteWithId(req, res) });


// User Routes
app.get('/users', (req, res) => { userController.get(req, res) });
app.get('/users/:id', (req, res) => { userController.getWithId(req, res) });
app.post('/users', (req, res) => { userController.post(req, res) });
app.delete('/users/:id', (req, res) => { userController.deleteWithId(req, res) });


// Start Listening on specified port
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});


// Logging Methods
var logIncomingRequest = (req, res, next) => {
    let logMessage = `${req.method} ${req.url}`;
    console.log(logMessage);
    fs.appendFile(__dirname + '/logs/serverLog.txt', '\n' + logMessage, (err) => {
        if (err) {
            console.log('An error occured writing to server logs.  Message: ' + err.message);
        }
    });

    next();
};