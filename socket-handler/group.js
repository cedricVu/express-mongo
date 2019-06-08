const groupController = require('../controllers/group');

export.initEvent = function(socket) {
	socket.on('groups', async function(data, callback) {
	    try {
			const action = data.action;
			switch(action) {
				case 'create':
					const group = await groupController.create({
						body: {
							name, members, type
						},
						user: {
							_id: socket.user._id
						}
					});
			  		socket.broadcast.emit('groups', group);
			  		return callback(null, data);
			}
	    } catch(e) {
	      	return callback(e);
	    }
    });
}