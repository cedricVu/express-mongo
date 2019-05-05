const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3001;
const userController = require('./controllers/users');
const userMiddleware = require('./middlewares/users');

app.use(bodyParser.json({ type: 'application/json' }));


const MongoClient = require('mongodb').MongoClient;
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'hello-server';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
	if (err) {
		console.log(err);
		process.exit(1);
	}
	console.log("Connected successfully to server");

	const db = client.db(dbName);

	app.use(function(req, res, next) {
		req.db = db;
		return next();
	});

	app.get('/api/v1/users', userMiddleware.getListUser, userController.getListUser); // get list user
	app.get('/api/v1/users/:id', userMiddleware.getUser, userController.getUser); // get one user by id
	app.post('/api/v1/users', userMiddleware.createUser, userController.createUser); // create new user
	app.delete('/api/v1/users/:id', userMiddleware.deleteUser, userController.deleteUser); // delete one user by id
	app.put('/api/v1/users/:id', userMiddleware.updateUser, userController.updateUser); // update one user by id

	app.use((err, req, res, next) => {
	    console.log(err);
	    return res.status(400).json({
	        message: 'Something went wrong'
	    });
	});

	app.listen(port, () => {
	    console.log(`Example app listening on port ${port}!`);
	});
});
