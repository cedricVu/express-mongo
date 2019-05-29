const Group = require('../models/group');

exports.create = async (req, res, next) => {
    
};


exports.getAll = async (req, res, next) => {
    try {
        const productCollection = req.db.collection('products');
        const products = await productCollection.find().toArray();
        return res.json({
            products
        });
        // get products, each product -> user 
        // populate
    } catch (e) {
        return next(e);
    }
};
