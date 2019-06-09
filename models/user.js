const { mongoose } = require('./index.js');

const userSchema = new mongoose.Schema({
  username: {
  	type: String,
  	required: true
  },
  avatar: {
  	type: String
  },
  email: {
  	type: String
  },
  socialId: {
  	type: String
  },
  password: String,
  email: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;