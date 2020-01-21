var mongoose = require("mongoose");
var Client = require('../models/client');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
chai.use(chaiHttp);

// Clean database before execution
describe('Clients', () =>{
	before((done)=>{
		Client.deleteMany({},(err)=>{
			done();
		});
	});
	/*
	* Clients testing. Test insertion and retrieving clients data.
	* Test Plan:
	*  1. Check database is empty
	*  2. Try to insert invalid data
	*  3. Try to insert incomplete data
	*  4. Add data 
	*  5. Check that data was added
	*/
	describe('Client POST & GET', () => {
		it('1. Check database is empty', (done) => {
			chai.request(server)
			.get('/client')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(0);
				done();
			});
		});

		it('2. Try invalid data type', (done) => {
			var client = {
				name: "Adrian",
				lastName: "Chacon",
				birth: "ninety one",
				email: 13252345,
				phone: 12414413
			}
			chai.request(server)
			.post('/client')
			.send(client)
			.end((err, res) => {
				//check for error in answer
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('errors');
				res.body.errors.should.have.property('birth');
				done();
				});
			});

		it('3. Try adding incomplete data', (done) => {
			var client = {
				name: "Adrian",
				lastName: "Chacon",
				email: 13252345,
				phone: 12414413
			}
			chai.request(server)
			.post('/client')
			.send(client)
			.end((err, res) => {
				//check for error in answer
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('errors');
				res.body.errors.should.have.property('birth');
				done();
				});
			});

		it('4. Check that data was added', (done) => {
			var client = {
				name: "Adrian",
				lastName: "Chacon",
				birth: "1991",
				email: "email@g.com",
				phone: "245346456",
			}
			chai.request(server)
			.post('/client')
			.send(client)
			.end((err, res) => {
				//check for error in answer
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.client.should.have.property('name');
				res.body.client.should.have.property('lastName');
				res.body.client.should.have.property('birth');
				res.body.client.should.have.property('email');
				res.body.client.should.have.property('phone');
				res.body.client.should.have.property('registered');
				done();
				});
			});

		it('5. Check database has data', (done) => {
			chai.request(server)
			.get('/client')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(1);
				done();
				});
			});
		});
	// Clean database after running the test
	after((done) => { 
	Client.deleteMany({}, (err) => { 
		done();           
		});        
	});
})