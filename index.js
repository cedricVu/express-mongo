const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3001;
const userRoute = require('./apis/user');
const productRoute = require('./apis/product');
const groupRoute = require('./apis/group');
const models = require('./models');
const http = require('http').Server(app);
const io = require('socket.io')(http);

models
.connectDB()
.then(console.log('Connect db successfully'))
.catch(function(e) {
	console.error(e);
	process.exit(1)
});
app.use(bodyParser.json({ type: 'application/json' }));

// Loading apis here
userRoute.load(app);
productRoute.load(app);
groupRoute.load(app);
// Lazy load

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/socket.io.js', function(req, res){
  res.sendFile(__dirname + '/socket.io.js');
});
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

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


http.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
