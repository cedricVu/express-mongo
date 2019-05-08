const productController = require('../controllers/product');
const validate = require('express-validation');

exports.load = function(app) {
	app.post('/api/v1/products', productController.create);
	app.get('/api/v1/products', productController.getAll);
}