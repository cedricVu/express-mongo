const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3001;
const userRoute = require('./apis/user');
const productRoute = require('./apis/product');

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

	// Loading apis here
	userRoute.load(app);
	productRoute.load(app);
	// Lazy load
	app.use((err, req, res, next) => {
		console.log(err);
		if (Array.isArray(err.errors)) {
			const messages = err.errors.map(function(item) {
				return item.messages;
			});
			return res.status(400).json({
				errors: messages
			});
		}
	    return res.status(400).json({
	        message: err.message
	    });
	});

	app.listen(port, () => {
	    console.log(`Example app listening on port ${port}!`);
	});
});
