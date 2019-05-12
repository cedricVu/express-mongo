// Destructuring
const mongoose = require('mongoose');

module.exports = {
	connectDB: function() {
		return mongoose.connect('mongodb://localhost/hello-server', { useNewUrlParser: true });
	},
	mongoose
}