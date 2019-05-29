const Group = require('../models/group');
const BaseRepository = require('./base-repository');

module.exports = class GroupRepository extends BaseRepository {
	constructor() {
		super(Group);
	}
}