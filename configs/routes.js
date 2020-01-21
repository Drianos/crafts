/*
 *	In this file: Route definition for lab rest service.
 */

var mongoose = require('mongoose');
var Client = require('../models/client');

/*
 *	Type:    POST
 *	Route:   /client
 *	Description: 	 
 *		Create new client in database
 */
function addClient(req, res){
	// Create client
	var newClient = new Client(req.body)
	
	// Save client to database
	newClient.save((err, client) =>{
		if(err){
			// Respond with error in case of failure
			res.send(err);
		}
		else{
			// On success respond with a message
			res.json({message: "New client added to databse.", client});
		}
	});
}

/*
 *	Type:    GET
 *	Route:   /client
 *	Description: 	 
 *		Get all clients in the database. Show their information
 */
function getClients(req,res){
	// Create query
	var searchQuery = Client.find({});
	
	searchQuery.exec((err,clients) => {
		if(err){
			// Respond with error in case of failure
			res.send(err);
		}
		else{
			// On success respond with list of cliets
			res.json(clients);
		}

	});
}

// TODO when requested
// The following functions were not requested by the client for the time being,
// rhis are being implented to comply with CRUD

/*
 *	Type:    GET
 *	Route:   /client/:id
 *	Description: 	 
 *		Gets a client information given an specific id.
 */
function getClient(req,res){
	// Create query
	Client.findById(req.params.id, (err, client) => {
		if(err){
			// Respond with error in case of failure
			res.send(err);
		}
		else{
			// On success respond with list of cliets
			res.json(client);
		}

	});
}

/*
 *	Type:    PUT
 *	Route:   /client/:id
 *	Description: 	 
 *		Updates a client data given an specific id.
 */
function updateClient(req, res){
	
	Client.findById({id: req.params.id}, (err, client)=>{
		if(err){
			// Respond with error in case of failure finding client
			res.send(err);
		}
		else{
			// On success, try to update client
			Object.assing(client, req.body).save((errr, client) =>{
				if(err){
				// Respond with error in case of failure
				res.send(err);
			}
			else{
				// On success respond with a message
				res.json({message: "Client data updated.", client});
			}})
		}
	});
	
}

/*
 *	Type:    DELETE
 *	Route:   /client/:id
 *	Description: 	 
 *		Deletes the data of a client.
 */
function deleteClient(req,res){
	// Create query
	Client.deleteOne(req.params.id, (err, result) => {
		if(err){
			// Respond with error in case of failure
			res.send(err);
		}
		else{
			// On success respond with message
			res.json({ message: "Client deleted!", result});
		}

	});
}

module.exports = { addClient, getClients, getClient, updateClient, deleteClient };