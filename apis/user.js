const userController = require('../controllers/users');
const validate = require('express-validation');
const userValidation = require('../validations/user');

exports.load = function(app) {
	app.get('/api/v1/users', validate(userValidation.getUserSchema()), userController.getListUser); // get list user
	// app.get('/api/v1/users/:id', userMiddleware.getUser, userController.getUser); // get one user by id
	// app.post('/api/v1/users', userMiddleware.createUser, userController.createUser); // create new user
	// app.delete('/api/v1/users/:id', userMiddleware.deleteUser, userController.deleteUser); // delete one user by id
	// app.put('/api/v1/users/:id', userMiddleware.updateUser, userController.updateUser); // update one user by id
}