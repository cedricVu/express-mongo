const { mongoose } = require('./index.js');

const schema = new mongoose.Schema({
  author: {
  	type: mongoose.Schema.ObjectId,
  	ref: 'User'
  },
  members: [
  	{
  		type: mongoose.Schema.ObjectId,
  		ref: 'User'
  	}
  ],
  lastMessage: {
  	type: mongoose.Schema.ObjectId,
  	ref: 'Message'
  },
  type: {
  	type: String,
  	enum: ['individual', 'group'],
  	required: true
  },
  name: {
  	type: String,
  	maxlength: 50
  }
}, { timestamps: true });

const Group = mongoose.model('Group', schema);

module.exports = Group;