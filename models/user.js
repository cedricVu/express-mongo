const { mongoose } = require('./index.js');

const userSchema = new mongoose.Schema({
  username: {
  	type: String,
  	required: true
  },
  password: String,
  email: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;