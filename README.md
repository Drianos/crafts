# MUN Inc (Made Up Name Incorporated)

This is a laboratory to study REST service creation, testing and deployment using Docker. Work in progress.

REST service will run on port 8080(when run from docker) and will control the data of the clients. Data per customer:
* Name
* Last name
* Date of birth
* Email
* Phone number

## Usage
The following routes can be accessed when service is running:
 
* Route: ```/client``` 			Methods: POST, GET 
 
* Route: ```/client/:id```		Methods: GET, PUT, DELETE 

## Running from docker

In order to prepare the docker for running this code use the following command in the root directory, ```docker``` must be installed in the computer:
```bash
docker-compose build
```

To run all the services inside docker use:
```bash
docker-compose up
```

## Running from source

In order to compile and run the program the host computer should have installed ```mongodb```, ```node``` and ```npm```. Run the following command in the root directory to install node modules dependencies.

```bash
npm install
```
to run the server use:

```bash
node app.js
```

To run the test cases use:
```bash
npm test
```
Note: database connection could be needing adjusting if run from source, edit app.js file for this. 

## License

Public domain