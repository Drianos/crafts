/*
 * In this File: Server and database connections. Run this file to start rest service.
 */

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 8080;
var client = require('./configs/routes');

// Database Options
var options = { 
                useNewUrlParser: true,
                useUnifiedTopology: true 
              }; 

// Connect to database     
// Use the following line to connect to host database
mongoose.connect('mongodb://127.0.0.1:27017/test',options);

//Use the following line to connect to docker database
//mongoose.connect('mongodb://database:27017/test',options);

var database = mongoose.connection;
database.on('error', console.error.bind(console, 'Database connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

// Set routes
app.get("/", (req, res) => res.json({message: "MUN Inc Lab"}));

app.route("/client")
    .get(client.getClients)

    .post(client.addClient);
app.route("/client/:id")
    .get(client.getClient)
    .delete(client.deleteClient)
    .put(client.updateClient);

app.listen(port);

// custom message
console.log("######## ############" );
console.log("#### MUN Inc Lab ####" );
console.log("############ ########" );
console.log(" " );
console.log("Listening on port " + port);
console.log("For now use: http://localhost:8080/");
console.log("Client CRUD: http://localhost:8080/client");

module.exports = app; 