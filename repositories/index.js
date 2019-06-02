const BaseRepository = require('./base-repository');

module.exports = {
	groupRepository: new BaseRepository('Group'),
	userRepository: new BaseRepository('User'),
	// messageRepository: new MessageRepository()
}