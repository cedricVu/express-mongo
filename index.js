const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3001;
const userRoute = require('./apis/user');
const productRoute = require('./apis/product');
const models = require('./models');
// {
// 	connectDB: [function],
// 	mongoose: Object//
// }
// Connect db:
models
.connectDB()
.then(console.log('Connect db successfully'))
.catch(function(e) {
	console.error(e);
	process.exit(1)
});
app.use(bodyParser.json({ type: 'application/json' }));
 

// Loading apis here
userRoute.load(app);
productRoute.load(app);
// Lazy load
app.use((err, req, res, next) => {
	console.log(err);
	if (Array.isArray(err.errors)) {
		const messages = err.errors.map(function(item) {
			return item.messages;
		});
		return res.status(400).json({
			errors: messages
		});
	}
    return res.status(400).json({
        message: err.message
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
