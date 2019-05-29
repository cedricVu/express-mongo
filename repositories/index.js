const GroupRepository = require('./group-repository');
// const MessageRepository = require('./message-repository');

module.exports = {
	groupRepository: new GroupRepository(),
	// messageRepository: new MessageRepository()
}