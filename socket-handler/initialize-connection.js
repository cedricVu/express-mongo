const message = require('./message');
const group = require('./group');

export.initConnect = function (io) {
	io.use(function(socket, next) {
		try {
			const token = socket.handshake.query.token;
			
			socket.user = verifiedData;
		} catch(e) {
			next(e);
		}
	});
	io.on('connection', function(socket) {
		console.log(socket.id);
		socket.to(socket.id).emit('eventName', data);
		message.initEvent(socket);
	  	group.initEvent(socket);
	  	
	  	socket.on('disconnect', function() {
		    console.log('user disconnected');
		});
	});
}