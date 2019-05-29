const groupController = require('../controllers/group');
const { verifyToken } = require ('../middlewares/authentication-middleware.js');

exports.load = function(app) {
	app.get('/api/v1/groups', groupController.list);
	app.post('/api/v1/groups', [ verifyToken ], groupController.create);
}