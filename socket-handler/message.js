
export.initEvent = function(socket) {
	socket.on('messages', function(data, callback) {
		try {
			const action = data.action;
			switch(action) {
				case 'create':
					socket.broadcast.emit('messages', { action, ...data });
					return callback(null, data);
				default:
					return
			}
		} catch(e) {
			return callback(e);
		}
    });
}